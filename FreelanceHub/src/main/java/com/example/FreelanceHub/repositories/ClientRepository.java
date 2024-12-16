package com.example.FreelanceHub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.FreelanceHub.models.Client;

public interface ClientRepository extends JpaRepository<Client,Integer> {
	Client findBycompEmail(String compEmail);
	Client findByClientId(String clientId);
}