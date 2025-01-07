package com.example.FreelanceHub.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SpaController {

    @GetMapping(value = "//{path:[^\\.]*}")
    public String redirect() {
        return "forward:/index.html";
    }

}
