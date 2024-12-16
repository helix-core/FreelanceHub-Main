package com.example.FreelanceHub.models;

import jakarta.persistence.*;

@Entity
@Table(name = "jobs")
public class Jobs {

public Jobs(){}

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int Id;

@ManyToOne
@JoinColumn(name = "jobId", referencedColumnName = "jobId", nullable = false)
private ClientJob jobId;

@ManyToOne
@JoinColumn(name = "free_id", referencedColumnName = "freeId", nullable = false)
private Freelancer FreeId;

@ManyToOne
@JoinColumn(name = "client_id", referencedColumnName = "clientId", nullable = false)
private Client clientId;

public String progress;

private String githublink;

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

public Client getClientId() {
	return clientId;
}

public void setClientId(Client clientId) {
	this.clientId = clientId;
}

public String getProgress() {
	return progress;
}

public void setProgress(String progress) {
	this.progress = progress;
}

public Jobs(String progress) {
	this.progress = progress;
}

public String getGithublink() {
	return githublink;
}

public void setGithublink(String githublink) {
	this.githublink = githublink;
}

public int getId() {
	return Id;
}

public void setId(int id) {
	Id = id;
}


}
