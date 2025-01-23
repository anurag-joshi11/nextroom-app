package com.nextroom.housing.app.service.impl;

import com.nextroom.housing.app.dto.ListingRequestDTO;
import com.nextroom.housing.app.exception.EntityNotFoundException;
import com.nextroom.housing.app.exception.UnauthorizedException;
import com.nextroom.housing.app.model.Listing;
import com.nextroom.housing.app.model.User;
import com.nextroom.housing.app.repository.ListingRepository;
import com.nextroom.housing.app.repository.UserRepository;
import com.nextroom.housing.app.service.ListingService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.nextroom.housing.app.constants.Constants.*;

@Service
@Transactional
public class ListingServiceImpl implements ListingService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void createListings(ListingRequestDTO listingRequestDTO) {
        Listing listing = modelMapper.map(listingRequestDTO, Listing.class);
        listing.setCreatedDate(LocalDateTime.now());
        UserDetails userDetails = getAuthenticatedUser()
                .orElseThrow(() -> new UnauthorizedException(UNAUTHORIZED_USER));
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EntityNotFoundException(USER_NOT_FOUND));
        listing.setLandlord(user);
        listingRepository.save(listing);
    }

    @Override
    public List<ListingRequestDTO> getAllListings() {
        return listingRepository.findAll().stream()
                .map(listing -> modelMapper.map(listing, ListingRequestDTO.class))
                .toList();
    }

    @Override
    public ListingRequestDTO getListingById(Long listingId) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new EntityNotFoundException(LISTING_NOT_FOUND));
        return modelMapper.map(listing, ListingRequestDTO.class);
    }

    @Override
    public List<ListingRequestDTO> getLandlordListings(String email) {
        return listingRepository.findByLandlord_Email(email).stream()
                .map(listing -> modelMapper.map(listing, ListingRequestDTO.class))
                .toList();
    }

    private Optional<UserDetails> getAuthenticatedUser() {
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .map(Authentication::getPrincipal)
                .filter(UserDetails.class::isInstance)
                .map(UserDetails.class::cast);
    }

    @Override
    public void updateListings(Listing listing, Long listingId) {
        Listing existingListing = listingRepository.findById(listingId).orElseThrow(() -> new RuntimeException(LISTING_NOT_FOUND));
        existingListing.setTitle(listing.getTitle());
        existingListing.setDescription(listing.getDescription());
        existingListing.setPrice(listing.getPrice());
        existingListing.setAddress(listing.getAddress());
        existingListing.setUpdatedDate(LocalDateTime.now());
        listingRepository.save(existingListing);
    }

    @Override
    public void deleteListing(Long listingId) {
        listingRepository.deleteById(listingId);
    }
}
