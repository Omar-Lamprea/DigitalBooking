package com.pi.digitalbooking.controllers;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.pi.digitalbooking.DTO.BookingDto;
import com.pi.digitalbooking.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public ResponseEntity<List<BookingDto>> getAllBookings() {
        List<BookingDto> bookings = bookingService.getAllBookings();
        if (bookings != null) {
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDto> getBookingById(@PathVariable Long id) {
        BookingDto booking = bookingService.getBookingById(id);
        if (booking != null) {
            return new ResponseEntity<>(booking, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<BookingDto> createBooking(@RequestBody BookingDto bookingDto) {
        BookingDto createdBooking = bookingService.createBooking(bookingDto);
        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingDto> updateBooking(@PathVariable Long id, @RequestBody BookingDto bookingDto) throws JsonMappingException {
        BookingDto updatedBooking = bookingService.updateBooking(id, bookingDto);
        if (updatedBooking != null) {
            return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        boolean deleted = bookingService.deleteBooking(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
