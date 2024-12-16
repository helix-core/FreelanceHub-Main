package com.example.FreelanceHub.repositories;

import com.example.FreelanceHub.models.ClientJob;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientJobRepository extends JpaRepository<ClientJob, Integer> {
	List<ClientJob> findByClientId(String clientId);
	ClientJob findById(int JobId);
	
	@Query("SELECT cj FROM ClientJob cj WHERE " +
			"cj.JobStat = :progress AND " +
			"cj.JobId NOT IN (" +
			"SELECT fj.jobId.JobId FROM FreelancerJob fj WHERE fj.FreeId.freeId = :freelancerId)")
	List<ClientJob> findJobsExcludingApplied(@Param("progress") String progress, @Param("freelancerId") String freelancerId);
	
	@Query("SELECT cj FROM ClientJob cj WHERE " +
			"cj.JobStat = :progress AND " +
			"LOWER(cj.JobTitle) LIKE LOWER(CONCAT('%', :query, '%')) AND " +
			"cj.JobId NOT IN (" +
			"SELECT fj.jobId.JobId FROM FreelancerJob fj WHERE fj.FreeId.freeId = :freelancerId)")
	List<ClientJob> searchJobsWithStatus(@Param("progress") String progress,
																 @Param("freelancerId") String freelancerId,
																 @Param("query") String query);
}
