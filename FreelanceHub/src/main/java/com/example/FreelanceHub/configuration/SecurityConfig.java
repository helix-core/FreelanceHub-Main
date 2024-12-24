// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// @Configuration
// public class SecurityConfig {

//     private final JwtFilter jwtFilter;

//     public SecurityConfig(JwtFilter jwtFilter) {
//         this.jwtFilter = jwtFilter;
//     }

//     @Bean
// public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//     http
//         .cors().configurationSource(corsConfigurationSource()).
//         and()
//         .csrf().disable()
//          // Disable CSRF for stateless JWT
//         .authorizeRequests()
//             .antMatchers(HttpMethod.OPTIONS, "/**").permitAll() 
//             .antMatchers("/signup/**", "/login/**").permitAll() // Public endpoints
//             .anyRequest().authenticated() // Secure all other endpoints
//         .and()
//         .exceptionHandling()
//             .authenticationEntryPoint((request,response,authException)->{
//                 response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Set status to 401
//                 response.setContentType("application/json"); // Set response type
//                 response.getWriter().write("{\"message\":\"Unauthorized access\"}");
//             })
//         .and()
//         .addFilterBefore(new JwtFilter(), UsernamePasswordAuthenticationFilter.class); // Add JWT filter
//     return http.build();
// }


//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder(); // Use BCrypt for password hashing
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//         return config.getAuthenticationManager();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); // Allow Angular app
//         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allow all HTTP methods
//         configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization")); // Allow all headers
//         configuration.setAllowCredentials(true); // Allow cookies if needed
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**",configuration);
//         return(source)
//     }
// }
