
package com.example.FreelanceHub.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "client_data")
public class Client {
	public Client() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Id;

	@Column(unique = true)
	private String clientId;

	public String compEmail;
	private String companyName;
	private String companyDescription;
	private String typeOfProject;
	private String repName;
	private String repDesignation;
	public String password;
	private BigDecimal walletBalance = BigDecimal.ZERO;

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getCompEmail() {
		return compEmail;
	}

	public void setCompEmail(String compEmail) {
		this.compEmail = compEmail;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getCompanyDescription() {
		return companyDescription;
	}

	public void setCompanyDescription(String companyDescription) {
		this.companyDescription = companyDescription;
	}

	public String getTypeOfProject() {
		return typeOfProject;
	}

	public void setTypeOfProject(String typeOfProject) {
		this.typeOfProject = typeOfProject;
	}

	public String getRepName() {
		return repName;
	}

	public void setRepName(String repName) {
		this.repName = repName;
	}

	public String getRepDesignation() {
		return repDesignation;
	}

	public void setRepDesignation(String repDesignation) {
		this.repDesignation = repDesignation;
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

	public BigDecimal getWalletBalance() {
		return walletBalance;
	}

	public void setWalletBalance(BigDecimal walletBalance) {
		this.walletBalance = walletBalance;
	}

	public Client(String compEmail, String companyName, String companyDescription, String typeOfProject, String repName,
			String repDesignation, String password) {
		super();
		this.compEmail = compEmail;
		this.companyName = companyName;
		this.companyDescription = companyDescription;
		this.typeOfProject = typeOfProject;
		this.repName = repName;
		this.repDesignation = repDesignation;
		this.password = password;
	}

	@Column
	private String resetToken;

	@Column
	private LocalDateTime tokenExpiry;

	public String getResetToken() {
		return resetToken;
	}

	public void setResetToken(String resetToken) {
		this.resetToken = resetToken;
	}

	public LocalDateTime getTokenExpiry() {
		return tokenExpiry;
	}

	public void setTokenExpiry(LocalDateTime tokenExpiry) {
		this.tokenExpiry = tokenExpiry;
	}

}