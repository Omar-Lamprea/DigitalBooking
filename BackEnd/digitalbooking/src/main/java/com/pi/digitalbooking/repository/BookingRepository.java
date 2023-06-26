package com.pi.digitalbooking.repository;

import com.pi.digitalbooking.DTO.BookingDto;
import com.pi.digitalbooking.entities.AppUser;
import com.pi.digitalbooking.entities.BookingEntity;
import com.pi.digitalbooking.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<BookingEntity, Long> {
    List<BookingEntity> findBookingByUserAndStatus(AppUser user, Status status);
}

