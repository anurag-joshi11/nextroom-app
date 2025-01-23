package com.nextroom.housing.app.repository;

import com.nextroom.housing.app.model.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InquiryRepository extends JpaRepository <Inquiry, Integer> {
}
