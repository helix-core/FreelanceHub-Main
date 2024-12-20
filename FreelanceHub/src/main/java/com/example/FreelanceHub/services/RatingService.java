package com.example.FreelanceHub.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.FreelanceHub.models.Client;
import com.example.FreelanceHub.models.ClientJob;
import com.example.FreelanceHub.models.Freelancer;
import com.example.FreelanceHub.models.Rating;
import com.example.FreelanceHub.repositories.ClientJobRepository;
import com.example.FreelanceHub.repositories.ClientRepository;
import com.example.FreelanceHub.repositories.FreelancerRepository;
import com.example.FreelanceHub.repositories.RatingRepository;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private FreelancerRepository freelancerRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ClientJobRepository clientJobRepository;

    public Rating addRating(String freelancerId, String clientId, int jobId, int ratingValue) {
        Freelancer freelancer = freelancerRepository.findByFreeId((String) freelancerId)
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));
        Client client= clientRepository.findByClientId((String) clientId);
        ClientJob clientjob = clientJobRepository.findById((int) jobId);
        Rating rating = new Rating();
        rating.setFreelancer(freelancer);
        rating.setClient(client);
        rating.setJob(clientjob);
        rating.setRating(ratingValue);

        Rating savedRating = ratingRepository.save(rating);

        // Update the average rating for the freelancer
        updateFreelancerRating(freelancer);

        return savedRating;
    }

    private void updateFreelancerRating(Freelancer freelancer) {
        List<Rating> ratings = ratingRepository.findAll(); // Ideally filter ratings by freelancer
        double averageRating = ratings.stream()
                .filter(r -> r.getFreelancer().getFreeId() == freelancer.getFreeId())
                .mapToInt(Rating::getRating)
                .average()
                .orElse(0);

        freelancer.setRating(averageRating);
        freelancerRepository.save(freelancer);
    }

    public int countFreelancerRatings(String freelancerId) {
        List<Rating> ratings = ratingRepository.findAll(); // Fetch all ratings
        Freelancer freelancer = freelancerRepository.findByFreeId((String) freelancerId)
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));
        int ratingCount = (int) ratings.stream()
                .filter(r -> r.getFreelancer().getFreeId() == freelancer.getFreeId()) // Filter by freelancer ID
                .count(); // Count the filtered ratings    
        return ratingCount;
    }


}
