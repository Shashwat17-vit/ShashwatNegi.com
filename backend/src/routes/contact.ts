import { Router, type Request, type Response } from 'express';
import nodemailer from 'nodemailer';
import { z } from 'zod';

export const contactRouter = Router();

// ── Nodemailer transporter (Gmail) ────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ── Validation schema ─────────────────────────────────────────────────────────
const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(1, 'Message is required').max(2000),
});

// ── POST /api/contact ─────────────────────────────────────────────────────────
contactRouter.post('/', async (req: Request, res: Response) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: 'Validation failed',
      details: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const { name, email, subject, message } = parsed.data;

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #b8864a; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
            New message from your portfolio
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; width: 80px;"><strong>From</strong></td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Email</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Subject</strong></td>
              <td style="padding: 8px 0;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #f7f4ef; border-radius: 4px; border-left: 3px solid #b8864a;">
            <p style="margin: 0; white-space: pre-wrap; color: #1c1814;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
            Hit reply to respond directly to ${name}.
          </p>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Nodemailer error:', err);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});
