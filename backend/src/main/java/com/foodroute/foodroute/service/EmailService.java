package com.foodroute.foodroute.service;

import com.foodroute.foodroute.model.User;
import com.foodroute.foodroute.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;
import java.util.Properties;

@Service
public class EmailService {
    @Value("${brevo.api-key}")
    private String apiKey;
    @Value("${brevo.url}")
    private String url;
    @Value("${brevo.support-email}")
    private String supportEmail;

    private final UserRepository userRepository;
    private final RestClient restClient;


    public EmailService(UserRepository userRepository, RestClient restClient) {
        this.restClient = restClient;
        this.userRepository = userRepository;
    }

    public void sendFeedbackEmail(Long userId, String subject, String comment) {
        User user = userRepository.findById(userId).get();
        String htmlMessage = "<html>"
                + "<head>"
                + "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">"
                + "<title>New User Feedback</title>"
                + "</head>"
                + "<body style=\"font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;\">"
                + "<div style=\"max-width: 600px; margin: 20px auto; padding: 20px;\">"
                + "<div style=\"background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden;\">"
                + "<div style=\"background-color: #4a6baf; padding: 20px; color: white;\">"
                + "<h1 style=\"margin: 0; font-size: 22px;\">New User Feedback Received</h1>"
                + "</div>"
                + "<div style=\"padding: 25px;\">"
                + "<h2 style=\"color: #333; margin-top: 0; font-size: 18px;\">Subject: " + subject + "</h2>"
                + "<div style=\"margin: 15px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4a6baf;\">"
                + "<p style=\"margin: 0; color: #555; line-height: 1.6;\">" + comment + "</p>"
                + "</div>"
                + "<p style=\"font-size: 14px; color: #777; margin-top: 20px;\">Sent by: " + user.getFullName() + " (" + user.getEmail() + ")</p>"
                + "</div>"
                + "<div style=\"background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #999;\">"
                + "<p style=\"margin: 0;\">Please respond to this feedback within 48 hours</p>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        Map<String, Object> requestBody = Map.of(
                "sender", Map.of("name", user.getFullName(), "email", user.getEmail()),
                "to", List.of(Map.of("email", supportEmail, "name", "Food Route")),
                "subject", subject,
                "htmlContent", htmlMessage
        );

        try {
            restClient.post()
                    .uri(url)
                    .header("api-key", apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .toBodilessEntity();
            System.out.println("Email sent successfully to: " + user.getEmail());
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

    public void sendVerificationEmail(User user) {
        String subject = "Account Verification";
        String verificationCode = user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        Map<String, Object> requestBody = Map.of(
                "sender", Map.of("name", "Food Route", "email", supportEmail),
                "to", List.of(Map.of("email", user.getEmail(), "name", user.getFullName())),
                "subject", subject,
                "htmlContent", htmlMessage
        );

        try {
            restClient.post()
                    .uri(url)
                    .header("api-key", apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .toBodilessEntity();
            System.out.println("Email sent successfully to: " + user.getEmail());
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
}
