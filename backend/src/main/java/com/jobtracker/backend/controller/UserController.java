package com.jobtracker.backend.controller;

import com.jobtracker.backend.model.User;
import com.jobtracker.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class UserController {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "Email already exists!";
        }

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        userRepository.save(user);

        return "User registered successfully!";
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {

        User existingUser =
                userRepository.findByEmail(user.getEmail());

        if (existingUser == null) {
            return "User not found!";
        }

        if (passwordEncoder.matches(
                user.getPassword(),
                existingUser.getPassword())) {

            return "Login Successful!";
        }

        return "Invalid Password!";
    }
}