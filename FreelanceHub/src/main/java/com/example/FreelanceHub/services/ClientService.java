package com.example.FreelanceHub.services;

import com.example.FreelanceHub.models.Client;
import com.example.FreelanceHub.models.Roles;
import com.example.FreelanceHub.repositories.ClientRepository;
import com.example.FreelanceHub.repositories.RolesRepository;
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
            clientRepository.save(savedclient);
            addRoleToClient(client.getClientId(), "client");
            return true;
        } catch (Exception e) {
            return false;
        }
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
            // Log error if needed
            System.err.println("Error adding role: " + e.getMessage());
        }
    }

    public String getUserRole(String clientId) {
        // Fetch the role based on the clientId
        Roles role = rolesRepository.findByRoleId(clientId);
        return role != null ? role.getRole() : null; // Return role or null if not found
    }

    public void hashExistingPasswords() {
        List<Client> clients = clientRepository.findAll(); // Fetch all clients

        for (Client client : clients) {
            String password = client.getPassword();

            // Check if the password is not already hashed
            if (!password.startsWith("$2a$")) { // BCrypt hash prefix
                String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
                client.setPassword(hashedPassword);
                clientRepository.save(client); // Update the client with the hashed password
            }
        }
    }

    public Client findByClientId(String clientId) {
        return clientRepository.findByClientId(clientId);
    }

}