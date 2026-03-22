package com.telusko.questionservice.model;

// import lombok.RequiredArgsConstructor;
// import lombok.Data;

// @RequiredArgsConstructor
public class Response {
    private Integer id;
    private String response;

    // Manually added getters and setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }
}
