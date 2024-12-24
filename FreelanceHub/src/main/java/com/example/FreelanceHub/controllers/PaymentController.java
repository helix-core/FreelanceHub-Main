package com.example.FreelanceHub.controllers;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.FreelanceHub.models.Transaction;
import com.example.FreelanceHub.services.PaymentService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/addCredits/{clientId}")
    public ResponseEntity<String> addCredits(@PathVariable String clientId, @RequestParam BigDecimal amount) {
        paymentService.addCreditsToClientWallet(clientId, amount);
        return ResponseEntity.ok("Credits added successfully!");
    }

    @PostMapping("/pay/{clientId}/{freelancerId}")
    public ResponseEntity<String> makePayment(@PathVariable String clientId, @PathVariable String freelancerId, @RequestParam BigDecimal amount) {
        paymentService.makePaymentFromClientToFreelancer(clientId, freelancerId, amount);
        System.out.println("payment done");
        return ResponseEntity.ok("Payment made successfully!");
    }

    @PostMapping("/withdraw/{freelancerId}")
    public ResponseEntity<String> withdraw(@PathVariable String freelancerId, @RequestParam BigDecimal amount) {
        paymentService.withdrawFromFreelancerWallet(freelancerId, amount);
        return ResponseEntity.ok("Withdrawal successful!");
    }

    @GetMapping("/balance/{userId}")
    public ResponseEntity<BigDecimal> getWalletBalance(@PathVariable String userId) {
        BigDecimal balance = paymentService.getWalletBalance(userId);
        System.out.println(balance);
        return ResponseEntity.ok(balance);
    }

    @GetMapping("/transactions/{userId}")
    public ResponseEntity<List<Transaction>> getTransactionHistory(@PathVariable String userId) {
        List<Transaction> transactions = paymentService.getTransactionHistory(userId);
        return ResponseEntity.ok(transactions);
    }
}