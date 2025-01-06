package com.example.FreelanceHub.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.FreelanceHub.models.Client;
import com.example.FreelanceHub.models.Freelancer;
import com.example.FreelanceHub.models.Transaction;
import com.example.FreelanceHub.repositories.ClientRepository;
import com.example.FreelanceHub.repositories.FreelancerRepository;
import com.example.FreelanceHub.repositories.TransactionRepository;

@Service
public class PaymentService {
    @Autowired
    private FreelancerRepository freelancerRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Transactional
    public void addCreditsToClientWallet(String clientId, BigDecimal amount) {
        Client client = clientRepository.findByClientId(clientId);
        if (client != null) {
            client.setWalletBalance(client.getWalletBalance().add(amount));
            clientRepository.save(client);
            Transaction transaction = new Transaction();
            transaction.setUserId(clientId);
            transaction.setType("CREDIT");
            transaction.setAmount(amount);
            transaction.setTimestamp(LocalDateTime.now());
            transaction.setDescription("Added credits to wallet");
            transaction.setStatus("COMPLETED");
            transactionRepository.save(transaction);
        }
    }

    @Transactional
    public void makePaymentFromClientToFreelancer(String clientId, String freelancerId, BigDecimal amount) {
        Client client = clientRepository.findByClientId(clientId);
        Optional<Freelancer> freelancerOpt = freelancerRepository.findByFreeId(freelancerId);
        Freelancer freelancer = freelancerOpt.get();

        if (client != null && freelancer != null) {
            if (client.getWalletBalance().compareTo(amount) >= 0) {
                client.setWalletBalance(client.getWalletBalance().subtract(amount));
                clientRepository.save(client);

                freelancer.setWalletBalance(freelancer.getWalletBalance().add(amount));
                freelancerRepository.save(freelancer);

                Transaction clientTransaction = new Transaction();
                clientTransaction.setUserId(clientId);
                clientTransaction.setType("PAYMENT");
                clientTransaction.setAmount(amount);
                clientTransaction.setTimestamp(LocalDateTime.now());
                clientTransaction.setDescription("Payment made to freelancer " + freelancerId);
                clientTransaction.setStatus("COMPLETED");
                transactionRepository.save(clientTransaction);

                Transaction freelancerTransaction = new Transaction();
                freelancerTransaction.setUserId(freelancerId);
                freelancerTransaction.setType("PAYMENT_RECEIVED");
                freelancerTransaction.setAmount(amount);
                freelancerTransaction.setTimestamp(LocalDateTime.now());
                freelancerTransaction.setDescription("Payment received from client " + clientId);
                freelancerTransaction.setStatus("COMPLETED");
                transactionRepository.save(freelancerTransaction);
            }
        }
    }

    @Transactional
    public void withdrawFromFreelancerWallet(String freelancerId, BigDecimal amount) {
        Optional<Freelancer> freelancerOpt = freelancerRepository.findByFreeId(freelancerId);
        if (freelancerOpt.isPresent()) {
            Freelancer freelancer = freelancerOpt.get();
            if (freelancer.getWalletBalance().compareTo(amount) >= 0) {
                freelancer.setWalletBalance(freelancer.getWalletBalance().subtract(amount));
                freelancerRepository.save(freelancer);
            } else {
                throw new RuntimeException("Insufficient balance");
            }
        } else {
            throw new RuntimeException("Freelancer not found with freeId: " + freelancerId);
        }
        Transaction transaction = new Transaction();
        transaction.setUserId(freelancerId);
        transaction.setType("WITHDRAWAL");
        transaction.setAmount(amount);
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setDescription("Withdrawal from wallet");
        transaction.setStatus("COMPLETED");
        transactionRepository.save(transaction);
    }

    public BigDecimal getWalletBalance(String userId) {
        if (userId.startsWith("F")) {
            Optional<Freelancer> freelancer = freelancerRepository.findByFreeId(userId);
            if (freelancer != null) {
                return freelancer.get().getWalletBalance();
            }
        } else {
            Client client = clientRepository.findByClientId(userId);
            if (client != null) {
                return client.getWalletBalance();
            }
        }
        return BigDecimal.ZERO;
    }

    public List<Transaction> getTransactionHistory(String userId) {
        return transactionRepository.findByUserId(userId);
    }

    public Map<String, BigDecimal> getMonthlySpending(String clientId) {
        List<Transaction> transactions = transactionRepository.findByUserIdAndType(clientId, "PAYMENT");
        Map<String, BigDecimal> monthlySpending = new HashMap<>();
        for (Transaction transaction : transactions) {
            String month = transaction.getTimestamp().getMonth().toString(); // Get month name
            monthlySpending.put(month,
                    monthlySpending.getOrDefault(month, BigDecimal.ZERO).add(transaction.getAmount()));
        }
        return monthlySpending;
    }

    public Map<String, BigDecimal> getMonthlyEarnings(String freelancerId) {
        List<Transaction> transactions = transactionRepository.findByUserIdAndType(freelancerId, "PAYMENT_RECEIVED");
        Map<String, BigDecimal> monthlyEarning = new HashMap<>();
        for (Transaction transaction : transactions) {
            String month = transaction.getTimestamp().getMonth().toString();
            monthlyEarning.put(month,
                    monthlyEarning.getOrDefault(month, BigDecimal.ZERO).add(transaction.getAmount()));
        }
        return monthlyEarning;
    }

}
