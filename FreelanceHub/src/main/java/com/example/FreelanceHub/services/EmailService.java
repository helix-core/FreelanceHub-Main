package com.example.FreelanceHub.services;

import com.example.FreelanceHub.models.Client;
import com.example.FreelanceHub.models.Freelancer;
import com.example.FreelanceHub.repositories.ClientRepository;
import com.example.FreelanceHub.repositories.FreelancerRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailsender;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private FreelancerRepository freelancerRepository;

    public void sendResetLink(String email, String resetLink) {
        try {
            String userName;
            if (clientRepository.findBycompEmail(email) != null) {
                userName = clientRepository.findBycompEmail(email).getCompanyName();
            } else if (freelancerRepository.findByfreeEmail(email) != null) {
                userName = freelancerRepository.findByfreeEmail(email).getFreeName();
            } else {
                userName = "Valued User";
            }

            MimeMessage mimeMessage = mailsender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(email);
            helper.setSubject("Password Reset Request");
            String emailContent = "<!DOCTYPE html>" +
                    "<html>" +
                    "<head>" +
                    "<style>" +
                    "body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }" +
                    ".container { max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #ccc; }"
                    +
                    ".header { background: linear-gradient(270deg, rgba(21, 201, 180, 0.5) 0%, rgba(21, 201, 180, 0.45) 30%, rgba(32, 232, 160, 0.45) 70%, rgba(32, 232, 160, 0.5) 100%); color: #232B50; text-align: center; padding: 10px; border-radius: 10px 10px 0 0;border:1px solid black; }"
                    +
                    ".header h1 { margin: 0; font-size: 24px; }" +
                    ".content { padding: 20px; color: #333; line-height: 1.6;border-right:1px solid black;border-left:1px solid black; }"
                    +
                    ".content a { display: inline-block; background: #232B50; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; }"
                    +
                    ".footer { text-align: center; padding: 10px; font-size: 12px; color: black; background: #f4f4f4; border:1px solid black;border-radius: 0 0 10px 10px; }"
                    +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div class='container'>" +
                    "<div class='header'>" +
                    "<h1>Reset Your Password</h1>" +
                    "</div>" +
                    "<div class='content'>" +
                    "<p>Hello " + userName + ",</p>" +
                    "<p>We received a request to reset your password. Click the button below to reset your password:</p>"
                    +
                    "<a href='" + resetLink + "'>Reset Password</a>" +
                    "<p>If you didn’t request this, you can safely ignore this email.</p>" +
                    "</div>" +
                    "<div class='footer'>" +
                    "<p>&copy; 2024 FreelanceHub. All Rights Reserved.</p>" +
                    "</div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";
            helper.setText(emailContent, true);
            mailsender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String generateResetToken() {
        return UUID.randomUUID().toString();
    }

    public void resetPasswordToken(String email) {
        Freelancer freelancer = freelancerRepository.findByfreeEmail(email);
        if (freelancer != null) {
            freelancer.setResetToken(null);
            freelancer.setTokenExpiry(null);
            freelancerRepository.save(freelancer);
        }

        Client client = clientRepository.findBycompEmail(email);
        if (client != null) {
            client.setResetToken(null);
            client.setTokenExpiry(null);
            clientRepository.save(client);
        }
    }

}
