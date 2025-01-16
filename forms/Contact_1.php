<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mailheader = "From:".$name."<".$email.">\r\n";
    $recipient = "negi3@wisc.edu";
    #mail($recipient, $subject, $message, $mailheader) or die("Error!");

    // Email body
    $body = "You have received a new message from the contact form.\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    // Send email
    if (mail($recipient, $subject, $body, $mailheader)) {
        echo 'Thank you for your message. We will get back to you shortly.';
    } else {
        echo 'Sorry, something went wrong. Please try again later.';
    }
?>
