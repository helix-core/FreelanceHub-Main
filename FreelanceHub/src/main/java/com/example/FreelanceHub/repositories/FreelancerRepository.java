package com.example.FreelanceHub.repositories;

import com.example.FreelanceHub.models.Freelancer;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FreelancerRepository extends JpaRepository<Freelancer, Integer> {
	Freelancer findByfreeEmail(String freeEmail);
	Optional<Freelancer> findByFreeId(String freeId);
}
