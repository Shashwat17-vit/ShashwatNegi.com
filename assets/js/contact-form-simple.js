// Simple Contact Form with EmailJS - No Build Step Required
(function() {
  'use strict';

  // EmailJS Configuration
  const EMAILJS_CONFIG = {
    serviceId: 'service_014e0ym',
    templateId: 'template_vn4u4og',
    publicKey: 'Eu9Aot1Y357BrOpSQ'
  };

  // Initialize EmailJS
  emailjs.init(EMAILJS_CONFIG.publicKey);

  // Get form element
  const form = document.querySelector('.contact-form-simple');
  if (!form) return;

  const loadingDiv = form.querySelector('.loading');
  const errorDiv = form.querySelector('.error-message');
  const successDiv = form.querySelector('.sent-message');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Handle form submission
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
      from_name: form.querySelector('[name="name"]').value.trim(),
      from_email: form.querySelector('[name="email"]').value.trim(),
      subject: form.querySelector('[name="subject"]').value.trim(),
      message: form.querySelector('[name="message"]').value.trim(),
      to_email: 'negi3@wisc.edu'
    };

    // Validate
    if (!formData.from_name || !formData.from_email || !formData.subject || !formData.message) {
      showError('All fields are required.');
      return;
    }

    // Show loading
    loadingDiv.classList.add('d-block');
    errorDiv.classList.remove('d-block');
    successDiv.classList.remove('d-block');
    submitBtn.disabled = true;

    try {
      // Send email via EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formData
      );

      // Success
      loadingDiv.classList.remove('d-block');
      successDiv.classList.add('d-block');
      form.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        successDiv.classList.remove('d-block');
      }, 5000);

    } catch (error) {
      // Error
      loadingDiv.classList.remove('d-block');
      showError(error.text || 'Failed to send message. Please try again.');
    } finally {
      submitBtn.disabled = false;
    }
  });

  function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.add('d-block');
    loadingDiv.classList.remove('d-block');
  }

})();
