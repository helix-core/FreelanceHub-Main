package com.example.FreelanceHub.models;

import jakarta.persistence.*;

@Entity
@Table(name = "free_jobs")
public class FreelancerJob {

public FreelancerJob(){}

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int Id;

@ManyToOne
@JoinColumn(name = "jobId", referencedColumnName = "JobId", nullable = false)
private ClientJob jobId;


@ManyToOne
@JoinColumn(name = "free_id", referencedColumnName = "freeId", nullable = false)
private Freelancer FreeId;

@ManyToOne
@JoinColumn(name = "jobs_id", referencedColumnName = "Id")
private Jobs jobDetails;

private long Salary;
private int Duration;
private int JobExp;
private float SkillMatch;
private String Status;

public FreelancerJob(long salary, int duration, int jobExp, float skillMatch, String status) {
	Salary = salary;
	Duration = duration;
	JobExp = jobExp;
	SkillMatch = skillMatch;
	Status = status;
}

public int getId() {
	return Id;
}

public void setId(int id) {
	Id = id;
}

public ClientJob getJobId() {
	return jobId;
}

public void setJobId(ClientJob jobId) {
	this.jobId = jobId;
}

public Freelancer getFreeId() {
	return FreeId;
}

public void setFreeId(Freelancer freeId) {
	FreeId = freeId;
}

public long getSalary() {
	return Salary;
}

public void setSalary(long salary) {
	Salary = salary;
}

public int getDuration() {
	return Duration;
}

public void setDuration(int duration) {
	Duration = duration;
}

public int getJobExp() {
	return JobExp;
}

public void setJobExp(int jobExp) {
	JobExp = jobExp;
}

public float getSkillMatch() {
	return SkillMatch;
}

public void setSkillMatch(float skillMatch) {
	SkillMatch = skillMatch;
}

public String getStatus() {
	return Status;
}

public void setStatus(String status) {
	Status = status;
}

public Jobs getJobDetails() {
	return jobDetails;
}

public void setJobDetails(Jobs jobDetails) {
	this.jobDetails = jobDetails;
}

}