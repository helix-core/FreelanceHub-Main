package com.example.FreelanceHub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.FreelanceHub.models.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client,Integer> {
	Client findBycompEmail(String compEmail);
	Client findByClientId(String clientId);
}