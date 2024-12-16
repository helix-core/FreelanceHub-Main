package com.example.FreelanceHub.repositories;

import com.example.FreelanceHub.models.ClientJob;
import com.example.FreelanceHub.models.FreelancerJob;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FreeJobRepository extends JpaRepository<FreelancerJob, Integer> {
	List<FreelancerJob> findByJobId(ClientJob jobId);
	
	@Query("SELECT fj FROM FreelancerJob fj WHERE fj.FreeId.freeId = :freelancerId AND fj.jobId = :jobId")
	FreelancerJob findByJobIdAndFreeId(@Param("jobId") ClientJob jobId, @Param("freelancerId") String freelancerId);

	@Query("SELECT fj FROM FreelancerJob fj WHERE fj.FreeId.freeId = :freelancerId AND fj.Status = :status")
    List<FreelancerJob> findJobsByFreelancerId(@Param("freelancerId") String freelancerId,@Param("status") String status);

    @Query("SELECT j FROM FreelancerJob j WHERE j.FreeId.freeId = :freelancerId AND j.Status = :status")
    List<FreelancerJob> findByFreeIdAndStatus(@Param("freelancerId") String freelancerId, @Param("status") String status);
    
    @Query("SELECT j FROM FreelancerJob j WHERE j.jobId.clientId = :clientId AND j.jobDetails.progress = :progress")
    List<FreelancerJob> findByClientIdAndProgress(@Param("clientId") String clientId, @Param("progress") String progress);
    
    @Query("SELECT j FROM FreelancerJob j WHERE j.FreeId.freeId = :freeId AND j.jobDetails.progress = :progress")
    List<FreelancerJob> findByFreeIdAndProgress(@Param("freeId") String freeId, @Param("progress") String progress);
}
