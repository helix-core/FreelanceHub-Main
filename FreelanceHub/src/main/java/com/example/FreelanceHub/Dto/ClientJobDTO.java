package com.example.FreelanceHub.Dto;

import java.util.Arrays;
import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ClientJobDTO {

    @NotBlank(message = "Job Title is required")
    @Size(min = 10, message = "Job Title must be atleast 10 characters")
    @Size(max = 100, message = "Job Title must not exceed 100 characters")
    private String jobTitle;

    @NotBlank(message = "Job Description is required")
    @Size(min = 20, message = "Job Title must be atleast 20 characters")
    @Size(max = 500, message = "Job Description must not exceed 500 characters")
    private String jobDesc;

    @NotBlank(message = "Skill requirements are mandatory")
    private List<String> skillReq;

    @NotNull(message = "Minimum duration is required")
    @Min(value = 1, message = "Minimum duration must be at least 1 day")
    private Integer durMin;

    @NotNull(message = "Maximum duration is required")
    @Min(value = 1, message = "Maximum duration must be at least 1 day")
    private Integer durMax;

    @NotNull(message = "Minimum cost is required")
    @Min(value = 1, message = "Minimum cost must be at least 1 dollar")
    private Integer costMin;

    @NotNull(message = "Maximum cost is required")
    @Min(value = 1, message = "Maximum cost must be at least 1 dollar")
    private Integer costMax;

    @NotNull(message = "Experience is required")
    @Min(value = 1, message = "Minimum experience must be at least 1 year")
    private Integer expMin;

    @NotBlank(message = "Job status is required")
    private String jobStat;

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getJobDesc() {
        return jobDesc;
    }

    public void setJobDesc(String jobDesc) {
        this.jobDesc = jobDesc;
    }
    

    public Integer getDurMin() {
        return durMin;
    }

    public void setDurMin(Integer durMin) {
        this.durMin = durMin;
    }

    public Integer getDurMax() {
        return durMax;
    }

    public void setDurMax(Integer durMax) {
        this.durMax = durMax;
    }

    public Integer getCostMin() {
        return costMin;
    }

    public void setCostMin(Integer costMin) {
        this.costMin = costMin;
    }

    public Integer getCostMax() {
        return costMax;
    }

    public void setCostMax(Integer costMax) {
        this.costMax = costMax;
    }

    public Integer getExpMin() {
        return expMin;
    }

    public void setExpMin(Integer expMin) {
        this.expMin = expMin;
    }

    public String getJobStat() {
        return jobStat;
    }

    public void setJobStat(String jobStat) {
        this.jobStat = jobStat;
    }

    public List<String> getSkillReq() {
        return skillReq;
    }

    public void setSkillReq(List<String> skillReq) {
        this.skillReq = skillReq;
    }

}

