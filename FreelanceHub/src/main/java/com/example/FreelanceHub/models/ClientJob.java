package com.example.FreelanceHub.models;

import java.util.Arrays;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "client_jobs")
public class ClientJob {

public ClientJob(){}

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int JobId;

@ManyToOne
@JoinColumn(name = "client_id", referencedColumnName = "clientId", insertable = false, updatable = false)
private Client clients;

@Column(name = "client_id", insertable = true, updatable = true)
private String clientId;

private String JobTitle;
private String jobDesc;

@Column(columnDefinition = "TEXT")
private String SkillReq;

private int DurMin;
private int DurMax;
private int CostMin;
private int CostMax;
private int ExpMin;

private String JobStat = "pending"; 

//Add a method to fetch the client name
	public String getClientName() {
		return clientId != null ? clients.getCompanyName() : null;
	}

public int getJobId() {
	return JobId;
}
public void setJobId(int jobId) {
	JobId = jobId;
}
public String getClientId() {
	return clientId;
}
public void setClientId(String clientId) {
	this.clientId = clientId;
}
public String getJobTitle() {
	return JobTitle;
}
public void setJobTitle(String jobTitle) {
	JobTitle = jobTitle;
}
public String getJobDesc() {
	return jobDesc;
}
public void setJobDesc(String jobDesc) {
	this.jobDesc = jobDesc;
}
public String getSkillReq() {
	return SkillReq;
}
public void setSkillReq(String skillReq) {
	SkillReq = skillReq;
}

public List<String> getSkillsAsList() {
	return Arrays.asList(this.SkillReq.split(","));
}

public void setSkillsFromList(List<String> skillsList) {
	this.SkillReq = String.join(",", skillsList);
}

public Client getClients() {
	return clients;
}
public void setClients(Client clients) {
	this.clients = clients;
}

public int getDurMin() {
	return DurMin;
}
public void setDurMin(int durMin) {
	DurMin = durMin;
}
public int getDurMax() {
	return DurMax;
}
public void setDurMax(int durMax) {
	DurMax = durMax;
}
public int getCostMin() {
	return CostMin;
}
public void setCostMin(int costMin) {
	CostMin = costMin;
}
public int getCostMax() {
	return CostMax;
}
public void setCostMax(int costMax) {
	CostMax = costMax;
}
public int getExpMin() {
	return ExpMin;
}
public void setExpMin(int expMin) {
	ExpMin = expMin;
}
public String getJobStat() {
	return JobStat;
}
public void setJobStat(String jobStat) {
	JobStat = jobStat;
}
public ClientJob(String jobTitle, String jobDesc, String skillReq, int durMin, int durMax, int costMin, int costMax,
		int expMin, String jobStat) {
	JobTitle = jobTitle;
	this.jobDesc = jobDesc;
	SkillReq = skillReq;
	DurMin = durMin;
	DurMax = durMax;
	CostMin = costMin;
	CostMax = costMax;
	ExpMin = expMin;
	JobStat = jobStat;
}


}