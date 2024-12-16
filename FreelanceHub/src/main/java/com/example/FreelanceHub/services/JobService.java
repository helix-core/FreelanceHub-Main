package com.example.FreelanceHub.services;


import com.example.FreelanceHub.models.FreelancerJob;
import com.example.FreelanceHub.models.Jobs;
import com.example.FreelanceHub.repositories.FreeJobRepository;
import com.example.FreelanceHub.repositories.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private FreeJobRepository freelancerJobsRepository;

    @Autowired
    private JobRepository jobRepository;

    public List<FreelancerJob> getJobsByFreelancer(String freelancerId) {
        return freelancerJobsRepository.findJobsByFreelancerId(freelancerId,"ongoing");
    }

    public List<FreelancerJob> getAcceptedJobsByFreelancer(String freelancerId) {
        return freelancerJobsRepository.findByFreeIdAndStatus(freelancerId, "accepted");
    }

    public void uploadProject(Integer jobId, String githublink) throws Exception {
        System.out.println("Updating job with ID: " + jobId);
        Jobs job =  jobRepository.findByjobId(jobId).orElseThrow(()->new RuntimeException("job not found"));
        job.setGithublink(githublink);
        job.setProgress("Unverified");
        jobRepository.save(job);
    }
}
