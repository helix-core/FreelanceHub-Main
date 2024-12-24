package com.example.FreelanceHub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.FreelanceHub.models.Rating;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {

}
