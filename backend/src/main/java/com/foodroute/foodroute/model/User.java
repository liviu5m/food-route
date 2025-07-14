package com.foodroute.foodroute.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String fullName;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    private String address;
    private String phoneNumber;
    private String role = "user";
    private String provider;

    private boolean enabled;
    @Column(name = "verification_code")
    private String verificationCode;
    @Column(name = "verification_expiration")
    private LocalDateTime verificationCodeExpiresAt;

    public User(String fullName, String username, String email, String password, String address, String phoneNumber) {
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public User() {
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", address='" + address + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", role='" + role + '\'' +
                ", provider='" + provider + '\'' +
                ", enabled=" + enabled +
                ", verificationCode='" + verificationCode + '\'' +
                ", verificationCodeExpiresAt=" + verificationCodeExpiresAt +
                '}';
    }
}
