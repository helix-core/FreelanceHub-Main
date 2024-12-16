package com.example.FreelanceHub.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.FreelanceHub.models.ClientJob;
import com.example.FreelanceHub.repositories.ClientJobRepository;

@Service
public class ClientJobService {

	@Autowired
	ClientJobRepository clientJobRepository;
	public List<ClientJob> findByClientId(String clientId) {
	        
			return clientJobRepository.findByClientId(clientId);
	        }

			
}

