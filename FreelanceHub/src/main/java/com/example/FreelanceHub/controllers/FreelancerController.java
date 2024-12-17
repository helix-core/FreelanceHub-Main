package com.example.FreelanceHub.controllers;

import org.springframework.stereotype.Controller;
import com.example.FreelanceHub.models.ClientJob;
import com.example.FreelanceHub.models.Freelancer;
import com.example.FreelanceHub.models.FreelancerJob;
import com.example.FreelanceHub.models.Jobs;
import com.example.FreelanceHub.repositories.ClientJobRepository;
import com.example.FreelanceHub.repositories.FreeJobRepository;
import com.example.FreelanceHub.repositories.FreelancerRepository;
import com.example.FreelanceHub.repositories.JobRepository;
import com.example.FreelanceHub.services.JobService;
import com.example.FreelanceHub.services.NotificationService;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class FreelancerController {

    @Autowired
    private HttpSession session;

    @Autowired
    private ClientJobRepository clientJobRepository;

    @Autowired
    private JobService jobService;

    @Autowired
    private FreelancerRepository freelancerRepository;

    @Autowired
    private FreeJobRepository freeJobRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/apply")
    public ResponseEntity<?> getJobDetails(@RequestParam Integer id, @RequestParam("userId") String userId,
            HttpSession session) {
        Optional<ClientJob> optionalJob = clientJobRepository.findById(id);

        if (optionalJob.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found");
        }

        ClientJob job = optionalJob.get();
        String freelancerId = userId;
        Freelancer freelancer = freelancerRepository.findByFreeId(freelancerId).orElse(null);
        if (freelancer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Freelancer not found");
        }

        List<String> jobSkills = job.getSkillsAsList();
        List<String> freelancerSkills = freelancer.getSkillsAsList();
        List<String> missingSkills = jobSkills.stream()
                .filter(skill -> !freelancerSkills.contains(skill))
                .toList();

        // Calculate matched skills
        long matchedSkillsCount = jobSkills.stream()
                .filter(freelancerSkills::contains)
                .count();
        int matchedPercentage = (int) ((matchedSkillsCount * 100.0) / jobSkills.size());

        Map<String, Object> response = new HashMap<>();
        response.put("job", job);
        response.put("salaryMin", job.getCostMin());
        response.put("salaryMax", job.getCostMax());
        response.put("durationMin", job.getDurMin());
        response.put("durationMax", job.getDurMax());
        response.put("experienceMin", job.getExpMin());
        response.put("experienceMax", 50);
        response.put("matchedSkillsPercentage", matchedPercentage);
        response.put("missingSkills", missingSkills);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/apply")
    public ResponseEntity<Map<String, String>> handleJobSubmission(
            @RequestParam("salary") int salary,
            @RequestParam("duration") int duration,
            @RequestParam("experience") int experience,
            @RequestParam("previousWorks") String previousWorks,
            @RequestParam("jobId") Integer jobId,
            @RequestParam("userId") String userId,
            Model model,
            HttpSession session,
            RedirectAttributes redirectAttributes) {

        Optional<ClientJob> optionalJob = clientJobRepository.findById(jobId);
        if (optionalJob.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Job not found."));
        }
        ClientJob job = optionalJob.get();

        String freelancerId = userId;
        if (freelancerId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Freelancer session is invalid."));
        }

        Freelancer freelancer = freelancerRepository.findByFreeId(freelancerId).orElse(null);
        if (freelancer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Freelancer not found."));
        }

        // Match skills
        List<String> jobSkills = job.getSkillsAsList();
        List<String> freelancerSkills = freelancer.getSkillsAsList();
        long matchedSkillsCount = jobSkills.stream()
                .filter(freelancerSkills::contains)
                .count();
        int matchedPercentage = (int) ((matchedSkillsCount * 100.0) / jobSkills.size());

        FreelancerJob freelancerJob = new FreelancerJob(salary, duration, experience, matchedPercentage, "ongoing");
        freelancerJob.setJobId(job);
        freelancerJob.setFreeId(freelancer);
        freelancerJob.setPreviousWorkLink(previousWorks);
        try {
            freeJobRepository.save(freelancerJob);
        } catch (Exception e) {
            model.addAttribute("error", "Failed to save job application: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to save job application: " + e.getMessage()));
        }

        // Return JSON response with message
        return ResponseEntity.ok(Map.of("message", "Application submitted successfully"));
    }

    @GetMapping("/applied-jobs")
    public ResponseEntity<List<FreelancerJob>> getAppliedJobs(@RequestParam("userId") String freelancerId) {
        if (freelancerId == null || freelancerId.isEmpty()) {
            return ResponseEntity.status(401).build();
        }

        List<FreelancerJob> appliedJobs = jobService.getJobsByFreelancer(freelancerId);
        return ResponseEntity.ok(appliedJobs);
    }

    @GetMapping("/accepted-jobs")
    public ResponseEntity<List<FreelancerJob>> getAcceptedJobs(@RequestParam String userId) {
        List<FreelancerJob> acceptedJobs = jobService.getAcceptedJobsByFreelancer(userId);
        if (acceptedJobs == null || acceptedJobs.isEmpty()) {
            acceptedJobs = new ArrayList<>();
        } else {
            Collections.reverse(acceptedJobs);
        }
        return ResponseEntity.ok(acceptedJobs);
    }

    @PostMapping("/upload-project")
    public ResponseEntity<String> uploadProject(
            @RequestParam("jobId") String jobIdString,
            @RequestParam("githubLink") String githubLink) {
        System.out.println("Received jobId: " + jobIdString);
        try {
            Integer jobId = Integer.parseInt(jobIdString);
            jobService.uploadProject(jobId, githubLink);
            Optional<Jobs> job = jobRepository.findByjobId(jobId);
            String clientId = job.get().getClientId().getClientId();
            notificationService.addNotification(clientId,
                    "One of your jobs had an upload. Kindly verify the progress!");
            return ResponseEntity.ok("Upload Successful");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading project");
        }
    }

    @GetMapping("/search")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> searchJobs(@RequestParam("query") String query,
            @RequestParam("userId") String userId, HttpSession session) {
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<ClientJob> jobs = clientJobRepository.searchJobsWithStatus("pending", userId, query);

        Map<String, Object> response = new HashMap<>();
        response.put("jobs", jobs);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/explore")
    public String showExplorePage(Model model, HttpSession session) {
        String userId = (String) session.getAttribute("userId");// Fetch freelancer ID from session
        if (userId == null) {
            return "redirect:/login"; // Redirect to login if the freelancer is not logged in
        }

        List<ClientJob> clientJobs = clientJobRepository.findJobsExcludingApplied("pending", userId);
        if (clientJobs == null || clientJobs.isEmpty()) {
            clientJobs = new ArrayList<>();
        }
        model.addAttribute("clientJobs", clientJobs);

        String role = (String) session.getAttribute("role");
        model.addAttribute("role", role);

        return "explore";
    }

    @GetMapping("/profile/freelancer")
    public ResponseEntity<Map<String, Object>> getFreelancerProfile(@RequestParam String userId) {
        try {
            // Fetch freelancer profile by userId
            Optional<Freelancer> freelancer = freelancerRepository.findByFreeId(userId);
            if (freelancer.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Freelancer not found"));
            }

            // Fetch ongoing and completed jobs for the freelancer
            List<FreelancerJob> ongoingJobs = freeJobRepository.findByFreeIdAndProgress(userId, "ongoing");
            for (FreelancerJob job : freeJobRepository.findByFreeIdAndProgress(userId, "unverified")) {
                ongoingJobs.add(job); // Include unverified jobs in ongoing jobs
            }
            List<FreelancerJob> completedJobs = freeJobRepository.findByFreeIdAndProgress(userId, "completed");

            // Prepare the response
            Map<String, Object> response = new HashMap<>();
            response.put("freelancer", freelancer.get()); // Add freelancer data
            response.put("ongoingJobs", ongoingJobs); // Add ongoing jobs
            response.put("completedJobs", completedJobs); // Add completed jobs

            return ResponseEntity.ok(response); // Return the response as JSON
        } catch (Exception e) {
            // Handle error and return an internal server error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An error occurred while fetching freelancer profile"));
        }
    }

    @GetMapping("/freelancer/edit/{freelancerId}")
    public ResponseEntity<Freelancer> getFreelancerProfile1(@PathVariable("freelancerId") String freelancerId) {
        Optional<Freelancer> freelancer = freelancerRepository.findByFreeId(freelancerId);
        if (freelancer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(freelancer.get());
    }

    @PostMapping("/freelancer/update")
    public ResponseEntity<Map<String, String>> updateFreelancer(@RequestBody Freelancer freelancer) {
        Optional<Freelancer> optionalFreelancer = freelancerRepository.findByFreeId(freelancer.getFreeId());

        Freelancer existingFreelancer = optionalFreelancer
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));

        // Update only editable fields
        existingFreelancer.setFreeEmail(freelancer.getFreeEmail());
        existingFreelancer.setFreeName(freelancer.getFreeName());
        existingFreelancer.setFreeAge(freelancer.getFreeAge());
        existingFreelancer.setCountry(freelancer.getCountry());
        existingFreelancer.setFOW(freelancer.getFOW());
        existingFreelancer.setExperience(freelancer.getExperience());
        existingFreelancer.setQualification(freelancer.getQualification());
        existingFreelancer.setSkills(freelancer.getSkills());
        existingFreelancer.setPassword(freelancer.getPassword());

        freelancerRepository.save(existingFreelancer);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Profile updated successfully");
        return ResponseEntity.ok(response);
    }

}
