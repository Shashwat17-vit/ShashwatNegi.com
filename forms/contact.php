<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Include PHPMailer's autoload file

// Collect form data
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Create a new PHPMailer instance
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();                                            // Use SMTP
    $mail->Host       = 'smtp.gmail.com';                       // Set SMTP server
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'shash14negi@gmail.com';                 // Your email
    $mail->Password   = 'jile picy kmto emmo';  // Your email password or app password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Encryption type
    $mail->Port       = 587;                                   // SMTP port

    // Recipients
    $mail->setFrom($email, $name);                             // Sender
    $mail->addAddress('Negi3@wisc.edu');          // Add recipient

    // Content
    $mail->isHTML(true);                                       // Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body    = "<h3>You have received a new message:</h3>
                      <p><strong>Name:</strong> $name</p>
                      <p><strong>Email:</strong> $email</p>
                      <p><strong>Message:</strong><br>$message</p>";

    // Send email
    $mail->send();
    echo 'Thank you. Message has been sent successfully!';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
