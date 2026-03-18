package com.raghav.backend.service;

import com.raghav.backend.dto.auth.AuthResponse;
import com.raghav.backend.dto.auth.LoginRequest;
import com.raghav.backend.dto.auth.RefreshRequest;
import com.raghav.backend.dto.auth.RegisterRequest;
import com.raghav.backend.dto.auth.UserResponse;

public interface AuthService {
    UserResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse refresh(RefreshRequest request);
}
