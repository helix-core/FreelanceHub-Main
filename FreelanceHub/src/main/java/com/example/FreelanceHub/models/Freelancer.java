package com.example.FreelanceHub.models;

import java.util.Arrays;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "free_data")
public class Freelancer {
    public Freelancer(String freeEmail, String freeName, int freeAge, String country, String fOW, int experience,
			String qualification, String skills, String password) {
		this.freeEmail = freeEmail;
		FreeName = freeName;
		FreeAge = freeAge;
		Country = country;
		FOW = fOW;
		Experience = experience;
		Qualification = qualification;
		Skills= skills;
		this.password = password;
	}
    public List<String> getSkillsAsList() {
		return Arrays.asList(this.Skills.split(","));
	}

	public void setSkillsFromList(List<String> skillsList) {
		this.Skills = String.join(",", skillsList);
	}
	
	public String getSkills() {
		return Skills;
	}

	public void setSkills(String skills) {
		Skills = skills;
	}

	public String getFreeId() {
		return freeId;
	}
	public void setFreeId(String freeId) {
		this.freeId = freeId;
	}
	public String getFreeEmail() {
		return freeEmail;
	}
	public void setFreeEmail(String freeEmail) {
		this.freeEmail = freeEmail;
	}
	public String getFreeName() {
		return FreeName;
	}
	public void setFreeName(String freeName) {
		FreeName = freeName;
	}
	public int getFreeAge() {
		return FreeAge;
	}
	public void setFreeAge(int freeAge) {
		FreeAge = freeAge;
	}
	public String getCountry() {
		return Country;
	}
	public void setCountry(String country) {
		Country = country;
	}
	public String getFOW() {
		return FOW;
	}
	public void setFOW(String fOW) {
		FOW = fOW;
	}
	public int getExperience() {
		return Experience;
	}
	public void setExperience(int experience) {
		Experience = experience;
	}
	public String getQualification() {
		return Qualification;
	}
	public void setQualification(String qualification) {
		Qualification = qualification;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public Freelancer(){}
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

	@Column(unique = true)
	private String freeId;

    public String freeEmail;
    private String FreeName;
    private int FreeAge;
    private String Country;
    private String FOW;
    private int Experience;
    private String Qualification;
    
    @Column(columnDefinition = "TEXT")
    private String Skills;
    
    public String password;
    
}