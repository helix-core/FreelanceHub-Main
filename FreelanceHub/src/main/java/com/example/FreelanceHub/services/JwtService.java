// package com.example.FreelanceHub.services;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.stereotype.Service;

// import javax.crypto.SecretKey;
// import java.util.Date;
// import java.util.function.Function;

// @Service
// public class JwtService {

//     private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512); // Generate secure key
//     private final UserDetailsService userDetailsService;

//     public JwtService(UserDetailsService userDetailsService) {
//         this.userDetailsService = userDetailsService;
//     }

//     // Generate a JWT token
//     public String generateToken(String username, String role) {
//         return Jwts.builder()
//                 .setSubject(username)
//                 .claim("role", role)
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 hours
//                 .signWith(secretKey, SignatureAlgorithm.HS512) // Use Key object
//                 .compact();
//     }

//     // Validate the token
//     public boolean validateToken(String token) {
//         try {
//             Jwts.parserBuilder()
//                 .setSigningKey(secretKey) // Use Key object
//                 .build()
//                 .parseClaimsJws(token);
//             return true;
//         } catch (Exception e) {
//             return false;
//         }
//     }

//     // Extract username from token
//     public String extractUsername(String token) {
//         return extractClaim(token, Claims::getSubject);
//     }

//     // Extract claims
//     public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//         Claims claims = Jwts.parserBuilder()
//                 .setSigningKey(secretKey) // Use Key object
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody();
//         return claimsResolver.apply(claims);
//     }

//     // Get Authentication object
//     public Authentication getAuthentication(String token) {
//         String username = extractUsername(token);
//         UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//         return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//     }
// }