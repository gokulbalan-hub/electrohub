package com.training.electriccircuit.dto;

public class LoginResponse {

    private Integer userId;
    private String userName;
    private String role;
    private String status;

    public LoginResponse(
            Integer userId,
            String userName,
            String role,
            String status) {

        this.userId = userId;
        this.userName = userName;
        this.role = role;
        this.status = status;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}