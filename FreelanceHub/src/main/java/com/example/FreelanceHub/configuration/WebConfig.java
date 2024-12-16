package com.example.FreelanceHub.configuration;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Allow CORS for all paths
                .allowedOrigins("http://localhost:4200")  // Allow Angular app on localhost:4200
                .allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS")  // Allow these HTTP methods
                .allowedHeaders("*")  // Allow all headers
                .allowCredentials(true);  // Allow cookies and credentials if needed
    }
    
}