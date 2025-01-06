package com.example.FreelanceHub.services;

import com.example.FreelanceHub.models.Client;
import com.example.FreelanceHub.models.Roles;
import com.example.FreelanceHub.repositories.ClientRepository;
import com.example.FreelanceHub.repositories.RolesRepository;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    public ClientRepository clientRepository;

    @Autowired
    private RolesRepository rolesRepository;

    public boolean registerClient(Client client) {
        try {
            Client savedclient = clientRepository.save(client);
            String unique = "C" + savedclient.getId();
            savedclient.setClientId(unique);
            savedclient.setWalletBalance(BigDecimal.valueOf(500));
            clientRepository.save(savedclient);
            addRoleToClient(client.getClientId(), "client");
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isEmailAlreadyRegistered(String email) {
        return clientRepository.existsByCompEmail(email);
    }

    public boolean validateClient(String compEmail, String password) {
        Client client = clientRepository.findBycompEmail(compEmail);
        return client != null && BCrypt.checkpw(password, client.getPassword());
    }

    public void addRoleToClient(String clientId, String roleName) {
        try {
            Roles role = new Roles(roleName, clientId);
            rolesRepository.save(role);
        } catch (Exception e) {
            System.err.println("Error adding role: " + e.getMessage());
        }
    }

    public String getUserRole(String clientId) {
        Roles role = rolesRepository.findByRoleId(clientId);
        return role != null ? role.getRole() : null;
    }

    public void hashExistingPasswords() {
        List<Client> clients = clientRepository.findAll();
        for (Client client : clients) {
            String password = client.getPassword();
            if (!password.startsWith("$2a$")) {
                String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
                client.setPassword(hashedPassword);
                clientRepository.save(client);
            }
        }
    }

    public Client findByClientId(String clientId) {
        return clientRepository.findByClientId(clientId);
    }

    public Client findByEmail(String email) {
        return clientRepository.findBycompEmail(email);
    }

    public Client findByResetToken(String resetToken) {
        return clientRepository.findByResetToken(resetToken);
    }

}