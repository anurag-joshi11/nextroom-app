package com.nextroom.housing.app.controller;

import com.nextroom.housing.app.dto.ListingRequestDTO;
import com.nextroom.housing.app.model.Listing;
import com.nextroom.housing.app.service.ListingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.nextroom.housing.app.constants.Constants.*;

@RestController
@RequestMapping("/listings")
@CrossOrigin(origins = FRONTEND_ORIGIN)
public class ListingController {

    @Autowired
    private ListingService listingService;

    /**
     * Creates a new listing.
     *
     * @param listingRequestDTO the listing data to be saved
     * @return a response indicating the creation success
     */
    @PostMapping("/create")
    public ResponseEntity<String> registerUser(@Valid @RequestBody ListingRequestDTO listingRequestDTO) {
        listingService.createListings(listingRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(LISTING_CREATED_SUCCESS);
    }

    /**
     * Retrieves all listings.
     *
     * @return a list of all listings
     */
    @GetMapping
    public List<ListingRequestDTO> getAllListings() {
        return listingService.getAllListings();
    }

    /**
     * Retrieves a listing by its ID.
     *
     * @param listingId the ID of the listing to retrieve
     * @return the details of the specified listing
     */
    @GetMapping("/{listingId}")
    public ListingRequestDTO getListingById(@PathVariable Long listingId) {
        return listingService.getListingById(listingId);
    }

    /**
     * Retrieves all listings for a specific landlord.
     *
     * @param email the email of the landlord
     * @return a list of listings for the landlord
     */
    @GetMapping("/landlord/{email}")
    public List<ListingRequestDTO> getLandlordListings(@PathVariable String email) {
        return listingService.getLandlordListings(email);
    }

    /**
     * Updates an existing listing.
     *
     * @param listing the updated listing data
     * @param listingId the ID of the listing to update
     * @return a response indicating the update success
     */
    @PutMapping("/update/{listingId}")
    public ResponseEntity<String> updateUser(@Valid @RequestBody Listing listing, @PathVariable Long listingId) {
        listingService.updateListings(listing, listingId);
        return ResponseEntity.status(HttpStatus.OK).body(LISTING_UPDATED_SUCCESS);
    }

    /**
     * Deletes a listing by its ID.
     *
     * @param listingId the ID of the listing to delete
     * @return a response indicating the deletion success
     */
    @DeleteMapping("/delete/{listingId}")
    public ResponseEntity<String> deleteListing(@PathVariable Long listingId) {
        listingService.deleteListing(listingId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
