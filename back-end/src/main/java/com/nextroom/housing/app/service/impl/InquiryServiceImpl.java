package com.nextroom.housing.app.service.impl;

import com.nextroom.housing.app.dto.InquiryRequestDTO;
import com.nextroom.housing.app.exception.EntityNotFoundException;
import com.nextroom.housing.app.exception.UnauthorizedException;
import com.nextroom.housing.app.model.Inquiry;
import com.nextroom.housing.app.model.Listing;
import com.nextroom.housing.app.model.User;
import com.nextroom.housing.app.repository.InquiryRepository;
import com.nextroom.housing.app.repository.ListingRepository;
import com.nextroom.housing.app.repository.UserRepository;
import com.nextroom.housing.app.service.InquiryService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static com.nextroom.housing.app.constants.Constants.*;
import static com.nextroom.housing.app.utils.CommonUtils.getAuthenticatedUser;

@Service
@Transactional
public class InquiryServiceImpl implements InquiryService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private InquiryRepository inquiryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ListingRepository listingRepository;


    @Override
    public void createInquiry(InquiryRequestDTO inquiryRequestDTO) {
        Inquiry inquiry = modelMapper.map(inquiryRequestDTO, Inquiry.class);
        inquiry.setCreatedDate(LocalDateTime.now());

        UserDetails userDetails = getAuthenticatedUser()
                .orElseThrow(() -> new UnauthorizedException(UNAUTHORIZED_USER));

        Listing listing = listingRepository.findById(inquiryRequestDTO.getListingId())
                .orElseThrow(() -> new EntityNotFoundException(LISTING_NOT_FOUND));
        inquiry.setListing(listing);

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EntityNotFoundException(USER_NOT_FOUND));
        inquiry.setStudent(user);

        inquiryRepository.save(inquiry);
    }
}
