package com.example.FreelanceHub.controllers;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import com.example.FreelanceHub.services.ClientService;
import com.example.FreelanceHub.services.FreelancerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.FreelanceHub.models.Client;
import com.example.FreelanceHub.models.Freelancer;
import com.example.FreelanceHub.repositories.ClientRepository;
import com.example.FreelanceHub.repositories.FreelancerRepository;
import com.example.FreelanceHub.services.EmailService;

@RestController
@RequestMapping("/api")
public class PasswordController {
    @Autowired
    private EmailService emailService;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private FreelancerRepository freelancerRepository;

    @Autowired
    private ClientService clientService;

    @Autowired
    private FreelancerService freelancerService;

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> requestData) {
        String email = requestData.get("email");
        Client client = clientRepository.findBycompEmail(email);
        Freelancer freelancer = freelancerRepository.findByfreeEmail(email);

        if (client == null && freelancer == null) {
            return ResponseEntity.badRequest().body("Email not registered");
        }

        String resetToken = emailService.generateResetToken();

        String resetLink = "http://freelancehub-frontend.s3-website-us-east-1.amazonaws.com/verify-reset-password?token="
                + resetToken;

        if (client != null) {
            client.setResetToken(resetToken);
            client.setTokenExpiry(LocalDateTime.now().plusMinutes(30));
            clientRepository.save(client);
        } else {
            freelancer.setResetToken(resetToken);
            freelancer.setTokenExpiry(LocalDateTime.now().plusMinutes(30));
            freelancerRepository.save(freelancer);
        }

        emailService.sendResetLink(email, resetLink);
        return ResponseEntity.ok("Reset link sent to your email");
    }

    @GetMapping("/verify-reset-password")
    public ResponseEntity<Map<String, Object>> handleResetPassword(@RequestParam("token") String token) {
        Freelancer freelancer = freelancerService.findByResetToken(token);
        Client client = clientService.findByResetToken(token);
        if ((freelancer != null && freelancer.getTokenExpiry().isBefore(LocalDateTime.now())) ||
                (client != null && client.getTokenExpiry().isBefore(LocalDateTime.now()))) {
            Map<String, Object> response = Map.of("message", "Expired token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        Map<String, Object> response = new HashMap<>();
        if (client != null) {
            response.put("redirectTo", "client");
            response.put("userId", client.getClientId());
            return ResponseEntity.ok(response);
        } else if (freelancer != null) {
            response.put("redirectTo", "freelancer");
            response.put("userId", freelancer.getFreeId());
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
