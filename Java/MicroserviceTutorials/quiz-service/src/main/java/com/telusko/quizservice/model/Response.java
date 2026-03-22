package com.telusko.quizservice.model;

//import lombok.Data;
//import lombok.RequiredArgsConstructor;

//@Data
//@RequiredArgsConstructor
public class Response {
    private Integer id;

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    private String response;
}
