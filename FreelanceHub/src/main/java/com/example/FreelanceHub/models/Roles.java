package com.example.FreelanceHub.models;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Roles {

public Roles(){}

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int UserId;

private String role;
private String RoleId;

public int getUserId() {
	return UserId;
}
public void setUserId(int userId) {
	UserId = userId;
}
public String getRole() {
	return role;
}
public void setRole(String role) {
	this.role = role;
}
public String getRoleId() {
	return RoleId;
}
public void setRoleId(String roleId) {
	RoleId = roleId;
}
public Roles(String role, String roleId) {
	this.role = role;
	RoleId = roleId;
}


}