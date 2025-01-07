package com.example.FreelanceHub.services;

import com.example.FreelanceHub.Dto.FreeDTO;
import com.example.FreelanceHub.models.Client;
import com.example.FreelanceHub.models.Freelancer;
import com.example.FreelanceHub.models.Roles;
import com.example.FreelanceHub.repositories.ClientRepository;
import com.example.FreelanceHub.repositories.FreeJobRepository;
import com.example.FreelanceHub.repositories.FreelancerRepository;
import com.example.FreelanceHub.repositories.RolesRepository;
import jakarta.persistence.EntityNotFoundException;
import java.nio.file.Path;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
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

    @Autowired
    S3Service s3Service;

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

    public boolean isEmailAlreadyRegistered(String email) {
        return freeRepository.existsByFreeEmail(email);
    }

    public boolean validateFreelancer(String freeEmail, String password) {
        Freelancer freelancer = freeRepository.findByfreeEmail(freeEmail);
        return freelancer != null && BCrypt.checkpw(password, freelancer.getPassword());
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
        Roles role = rolesRepository.findByRoleId(freeId);
        return role != null ? role.getRole() : null;
    }

    public Freelancer findByFreeId(String freeId) {
        return freeRepository.findByFreeId(freeId)
                .orElseThrow(() -> new EntityNotFoundException("Freelancer not found for freeId: " + freeId));
    }

    public String saveProfileImage(MultipartFile profileImage) {
        if (profileImage == null || profileImage.isEmpty()) {
            return null;
        }
        return s3Service.uploadFile(profileImage, "profile-images");
    }

    public String saveFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }
        return s3Service.uploadFile(file, "resumes");
    }

    public void hashExistingFreelancerPasswords() {
        List<Freelancer> freelancers = freeRepository.findAll();

        for (Freelancer freelancer : freelancers) {
            String password = freelancer.getPassword();
            if (!password.startsWith("$2a$")) {
                String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
                freelancer.setPassword(hashedPassword);
                freeRepository.save(freelancer);
            }
        }
    }

    public Freelancer findByEmail(String email) {
        return freeRepository.findByfreeEmail(email);
    }

    public Freelancer findByResetToken(String resetToken) {
        return freeRepository.findByResetToken(resetToken);
    }
}