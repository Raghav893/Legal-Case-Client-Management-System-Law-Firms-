package com.lawfirm.cms.controller;

import com.lawfirm.cms.dto.JwtResponse;
import com.lawfirm.cms.dto.LoginRequest;
import com.lawfirm.cms.dto.MessageResponse;
import com.lawfirm.cms.dto.SignupRequest;
import com.lawfirm.cms.entity.User;
import com.lawfirm.cms.repository.UserRepository;
import com.lawfirm.cms.security.jwt.JwtUtils;
import com.lawfirm.cms.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
    String role = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .findFirst().orElse("ROLE_ASSISTANT");

    return ResponseEntity.ok(new JwtResponse(jwt, 
                         userDetails.getId(), 
                         userDetails.getUsername(), 
                         userDetails.getEmail(), 
                         role));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = User.builder()
        .username(signUpRequest.getUsername())
        .email(signUpRequest.getEmail())
        .password(encoder.encode(signUpRequest.getPassword()))
        .name(signUpRequest.getName())
        .role(signUpRequest.getRole())
        .build();

    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
}
