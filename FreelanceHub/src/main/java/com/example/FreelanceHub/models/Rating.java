package com.example.FreelanceHub.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ratings")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "rating", nullable = false)
    private int rating;

    @ManyToOne
    @JoinColumn(name = "free_id", referencedColumnName = "freeId", nullable = false)
    private Freelancer freelancer;

    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "clientId", nullable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "job_id", referencedColumnName = "jobId", nullable = false)
    private ClientJob job;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Freelancer getFreelancer() {
        return freelancer;
    }

    public void setFreelancer(Freelancer freelancer) {
        this.freelancer = freelancer;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public ClientJob getJob() {
        return job;
    }

    public void setJob(ClientJob job) {
        this.job = job;
    }

}
