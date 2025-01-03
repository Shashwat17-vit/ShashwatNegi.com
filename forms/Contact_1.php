<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die('Invalid email format.');
    }

    // Set email details
    $to = 'negi3@wisc.edu'; // Replace with your email address
    $subject = $_POST['Subject'];
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    // Email body
    $body = "You have received a new message from the contact form.\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo 'Thank you for your message. We will get back to you shortly.';
    } else {
        echo 'Sorry, something went wrong. Please try again later.';
    }
} else {
    echo 'Invalid request method.';
}
?>