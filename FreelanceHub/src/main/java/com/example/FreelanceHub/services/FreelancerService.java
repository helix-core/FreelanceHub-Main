package com.example.FreelanceHub.services;

import com.example.FreelanceHub.Dto.FreeDTO;
import com.example.FreelanceHub.models.Freelancer;
import com.example.FreelanceHub.models.Roles;
import com.example.FreelanceHub.repositories.FreeJobRepository;
import com.example.FreelanceHub.repositories.FreelancerRepository;
import com.example.FreelanceHub.repositories.RolesRepository;
import jakarta.persistence.EntityNotFoundException;
import java.nio.file.Path;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FreelancerService {

    @Autowired
    public FreelancerRepository freeRepository;

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    FreeJobRepository freeJobRepository;

    public boolean registerFreelancer(Freelancer freelancer) {
        try {

            Freelancer savedFreelancer = freeRepository.save(freelancer);
            String uniqueFreeId = "F" + savedFreelancer.getId();
            savedFreelancer.setFreeId(uniqueFreeId);
            freeRepository.save(savedFreelancer);
            addRoleToFree(savedFreelancer.getFreeId(), "freelancer");
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean validateFreelancer(String freeEmail, String password) {
        Freelancer free = freeRepository.findByfreeEmail(freeEmail);
        if (free != null && free.getPassword().equals(password)) {

            return true;
        }
        return false;
    }

    private void addRoleToFree(String freeId, String roleName) {
        try {
            Roles role = new Roles(roleName, freeId);
            rolesRepository.save(role);
        } catch (Exception e) {

            System.err.println("Error adding role: " + e.getMessage());
        }
    }

    public String getUserRole(String freeId) {
        // Fetch the role based on the clientId
        Roles role = rolesRepository.findByRoleId(freeId);
        return role != null ? role.getRole() : null; // Return role or null if not found
    }

    public Freelancer findByFreeId(String freeId) {
        return freeRepository.findByFreeId(freeId)
                .orElseThrow(() -> new EntityNotFoundException("Freelancer not found for freeId: " + freeId));
    }

    public String saveProfileImage(MultipartFile profileImage) {
        if (profileImage == null || profileImage.isEmpty()) {
            return null; // Handle case where no image is uploaded
        }

        // Define the path where the profile images will be saved
        String fileName = UUID.randomUUID().toString() + "-" + profileImage.getOriginalFilename(); // Add a unique ID to
                                                                                                   // avoid name
                                                                                                   // conflicts
        Path targetLocation = Paths.get("src/main/resources/static/images/profile_images/" + fileName);

        try {
            // Save the file to the target location
            Files.copy(profileImage.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
            return null; // Handle exception if file saving fails
        }

        // Return the relative URL to the image
        return "/images/profile_images/" + fileName;
    }

}