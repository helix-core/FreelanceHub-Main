// package com.example.FreelanceHub.filters;

// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.filter.OncePerRequestFilter;

// import com.example.FreelanceHub.services.JwtService;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import java.io.IOException;

// public class JwtFilter extends OncePerRequestFilter {

//     private final JwtService jwtService;

//     public JwtFilter(JwtService jwtService) {
//         this.jwtService = jwtService;
//     }

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//             throws ServletException, IOException {
//         String authHeader = request.getHeader("Authorization");
//         String path = request.getRequestURI();
//         if (path.startsWith("/signup") || path.startsWith("/login")) {
//             filterChain.doFilter(request, response); // Skip token validation
//             return;
//         }
//         if (authHeader != null && authHeader.startsWith("Bearer ")) {
//             String jwt = authHeader.substring(7);
//             if (jwtService.validateToken(jwt)) {
//                 Authentication authentication= jwtService.getAuthentication(jwt);
//                 SecurityContextHolder.getContext().setAuthentication(authentication);
//             }
//         }else if(authHeader == null || !authHeader.startsWith("Bearer ")){
//             logger.warn("No JWT token found in request headers");
//             System.out.println("No token");
//             filterChain.doFilter(request, response);
//             return;
//         }

//         filterChain.doFilter(request, response); // Continue the filter chain
//     }
// }
