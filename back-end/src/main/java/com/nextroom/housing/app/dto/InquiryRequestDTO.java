package com.nextroom.housing.app.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class InquiryRequestDTO {

    @NotBlank(message = "Listing ID is required")
    private Long listingId;

    @NotBlank(message = "Message cannot be empty")
    private String message;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Name is required")
    private String name;
}
