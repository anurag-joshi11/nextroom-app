package com.nextroom.housing.app.controller;

import com.nextroom.housing.app.dto.UserRequestDTO;
import com.nextroom.housing.app.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import static com.nextroom.housing.app.constants.Constants.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = FRONTEND_ORIGIN)
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Registers a new user
     *
     * @param userRequestDTO the user data to be saved
     */
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        userService.saveUser(userRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(USER_CREATED_SUCCESS);
    }

    /**
     * Authenticates a user
     *
     * @param request the user data to be saved
     */
    @GetMapping("/authenticate")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            User user = (User) authentication.getPrincipal();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body(USER_NOT_LOGGED_IN);
        }
    }
}
