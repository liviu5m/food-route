package com.foodroute.foodroute.handlers;

import com.foodroute.foodroute.model.Cart;
import com.foodroute.foodroute.model.User;
import com.foodroute.foodroute.repository.CartRepository;
import com.foodroute.foodroute.repository.UserRepository;
import com.foodroute.foodroute.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final CartRepository cartRepository;
    @Value("${spring.redirect-url}")
    private String redirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        Map<String, Object> attributes = token.getPrincipal().getAttributes();
        String email = (String) attributes.get("email");
        Optional<User> optionalUser = userRepository.findByEmail(email);
        System.out.println(email + attributes);
        User user;
        System.out.println(optionalUser);
        if(optionalUser.isPresent()) {
            user = optionalUser.get();
            if(user.getProvider().equals("credentials")) {
                response.sendRedirect(redirectUrl+"auth/login?error=provider_mismatch");
                return;
            }
        }else {
            user = new User();
            user.setEmail(email);
            user.setUsername(email);
            user.setPassword(passwordEncoder.encode("google"));
            user.setFullName((String) attributes.get("name"));
            user.setProvider(token.getAuthorizedClientRegistrationId());
            user.setEnabled(true);
            user.setProvider("google");
            User savedUser = userRepository.save(user);
            Cart cart = new Cart(savedUser);
            cartRepository.save(cart);
        }

        String jwtToken = jwtService.generateToken(user);
        ResponseCookie jwtCookie = ResponseCookie.from("jwt", jwtToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(jwtService.getExpirationTime() / 1000)
                .build();

        response.addHeader(org.springframework.http.HttpHeaders.SET_COOKIE, jwtCookie.toString());
        response.sendRedirect(redirectUrl);
    }
}
