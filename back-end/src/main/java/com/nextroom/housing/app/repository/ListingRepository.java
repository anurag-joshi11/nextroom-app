package com.nextroom.housing.app.repository;

import com.nextroom.housing.app.model.Listing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListingRepository extends JpaRepository<Listing, Long> {
    public List<Listing> findByLandlord_Email(String email);
}
