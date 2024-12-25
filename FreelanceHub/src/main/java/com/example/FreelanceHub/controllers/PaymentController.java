package com.example.FreelanceHub.controllers;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.FreelanceHub.models.Transaction;
import com.example.FreelanceHub.repositories.TransactionRepository;
import com.example.FreelanceHub.services.PaymentService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private TransactionRepository transactionRepository;

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
        List<Transaction> transactions = paymentService.getTransactionHistory(userId)
            .stream()
            .sorted((t1, t2) -> t2.getTimestamp().compareTo(t1.getTimestamp()))
            .toList();

        return ResponseEntity.ok(transactions);
    }

    
    @GetMapping("/monthlySpending/{clientId}")
    public ResponseEntity<Map<String, BigDecimal>> getMonthlySpending(@PathVariable String clientId) {
        Map<String, BigDecimal> monthlySpending = paymentService.getMonthlySpending(clientId);
        return ResponseEntity.ok(monthlySpending);
    }
    
    @GetMapping("/monthlyEarnings/{freelancerId}")
    public ResponseEntity<Map<String, BigDecimal>> getMonthlyEarnings(@PathVariable String freelancerId) {
        Map<String, BigDecimal> monthlyEarnings = paymentService.getMonthlyEarnings(freelancerId);
        return ResponseEntity.ok(monthlyEarnings);
    }

    
    @GetMapping("/transactions/daily-volume/{userId}")
    public ResponseEntity<Map<String, Long>> getDailyTransactionVolume(@PathVariable String userId) {
        List<Transaction> transactions = paymentService.getTransactionHistory(userId);
        Map<String, Long> dailyTransactionCount = transactions.stream()
            .collect(Collectors.groupingBy(
                t -> {
                	LocalDate startOfWeek = t.getTimestamp().toLocalDate().with(DayOfWeek.MONDAY);
                	return startOfWeek.toString();// Group by date (YYYY-MM-DD)
                },
                Collectors.counting()
            ));

        return ResponseEntity.ok(dailyTransactionCount);
    }


    
}