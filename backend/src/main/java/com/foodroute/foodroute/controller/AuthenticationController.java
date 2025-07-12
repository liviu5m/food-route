package com.foodroute.foodroute.controller;

import com.foodroute.foodroute.dto.LoginUserDto;
import com.foodroute.foodroute.dto.RegisterUserDto;
import com.foodroute.foodroute.dto.VerifyUserDto;
import com.foodroute.foodroute.model.User;
import com.foodroute.foodroute.responses.LoginResponse;
import com.foodroute.foodroute.service.AuthenticationService;
import com.foodroute.foodroute.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterUserDto registerUserDto, BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = new ArrayList<String>();
            result.getFieldErrors().forEach(error -> errors.add(error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);
        }
        if(!registerUserDto.getPasswordConfirmation().equals(registerUserDto.getPassword())) return ResponseEntity.badRequest().body("Passwords do not match");

        User registerdUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registerdUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
        try {
            authenticationService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account verified successfully");
        }catch(RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
        try {
            authenticationService.ressendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        }catch(RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
