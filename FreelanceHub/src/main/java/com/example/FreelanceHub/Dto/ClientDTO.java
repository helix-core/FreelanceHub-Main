package com.example.FreelanceHub.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ClientDTO {
	@NotBlank(message = "Email is mandatory")
    @Email(message = "Invalid email format")
    private String compEmail;

    @NotBlank(message = "Company name is mandatory")
    @Size(max = 50, message = "Company name cannot exceed 50 characters")
    private String companyName;

    @Size(max = 200, message = "Description cannot exceed 200 characters")
    private String companyDescription;

    @NotBlank(message = "Type of project is mandatory")
    private String typeOfProject;

    @NotBlank(message = "Representative name is mandatory")
    private String repName;

    @NotBlank(message = "Representative designation is mandatory")
    private String repDesignation;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$", message = "Password must contain at least one letter and one number")
    private String password;

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
    
    
}
