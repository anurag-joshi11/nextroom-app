package com.nextroom.housing.app.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import java.util.Optional;

public class CommonUtils {

    /**
     * Gets the currently authenticated user, if available.
     *
     * @return an Optional with the authenticated user, or empty if no user is authenticated
     */
    public static Optional<User> getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            return Optional.of((User) authentication.getPrincipal());
        }
        return Optional.empty();
    }
}
