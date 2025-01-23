package com.nextroom.housing.app.service;

import com.nextroom.housing.app.dto.ListingRequestDTO;
import com.nextroom.housing.app.model.Listing;

import java.util.List;

public interface ListingService {
    public void createListings(ListingRequestDTO listingRequestDTO);

    public List<ListingRequestDTO> getAllListings();

    public ListingRequestDTO getListingById(Long listingId);

    public List<ListingRequestDTO> getLandlordListings(String email);

    public void updateListings(Listing listing, Long listingId);

    public void deleteListing(Long listingId);
}
