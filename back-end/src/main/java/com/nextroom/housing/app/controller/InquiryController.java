package com.nextroom.housing.app.controller;

import com.nextroom.housing.app.dto.InquiryRequestDTO;
import com.nextroom.housing.app.service.InquiryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.nextroom.housing.app.constants.Constants.FRONTEND_ORIGIN;
import static com.nextroom.housing.app.constants.Constants.INQUIRY_CREATED_SUCCESS;

@RestController
@RequestMapping("/inquiries")
@CrossOrigin(origins = FRONTEND_ORIGIN)
public class InquiryController {

    @Autowired
    private InquiryService inquiryService;

    /**
     * Creates a new inquiry.
     *
     * @param inquiryRequestDTO the inquiry data to be saved
     * @return a response indicating the inquiry creation success
     */
    @PostMapping
    public ResponseEntity<String> createInquiry(@Valid @RequestBody InquiryRequestDTO inquiryRequestDTO) {
        inquiryService.createInquiry(inquiryRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(INQUIRY_CREATED_SUCCESS);
    }
}
