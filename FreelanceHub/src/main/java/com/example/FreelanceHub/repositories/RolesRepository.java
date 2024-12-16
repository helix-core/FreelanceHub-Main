package com.example.FreelanceHub.repositories;

import com.example.FreelanceHub.models.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RolesRepository extends JpaRepository<Roles, Integer> {
	
	@Query("SELECT r FROM Roles r WHERE r.RoleId = :RoleId")
    Roles findByRoleId(@Param("RoleId") String RoleId);
}
