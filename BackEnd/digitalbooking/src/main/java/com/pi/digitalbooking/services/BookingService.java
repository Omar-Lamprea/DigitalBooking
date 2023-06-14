package com.pi.digitalbooking.services;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pi.digitalbooking.DTO.BookingDto;
import com.pi.digitalbooking.entities.BookingEntity;
import com.pi.digitalbooking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public BookingService(BookingRepository bookingRepository, ObjectMapper objectMapper) {
        this.bookingRepository = bookingRepository;
        this.objectMapper = objectMapper;
    }

    public List<BookingDto> getAllBookings() {
        List<BookingEntity> bookings = bookingRepository.findAll();
        return bookings.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public BookingDto getBookingById(Long id) {
        Optional<BookingEntity> optionalBooking = bookingRepository.findById(id);
        return optionalBooking.map(this::convertToDto).orElse(null);
    }

    public BookingDto createBooking(BookingDto bookingDto) {
        BookingEntity booking = convertToEntity(bookingDto);
        BookingEntity createdBooking = bookingRepository.save(booking);
        return convertToDto(createdBooking);
    }

    public BookingDto updateBooking(Long id, BookingDto bookingDto) throws JsonMappingException {
        Optional<BookingEntity> optionalBooking = bookingRepository.findById(id);
        if (optionalBooking.isPresent()) {
            BookingEntity booking = optionalBooking.get();
            objectMapper.updateValue(bookingDto, booking);
            booking.setId(id);
            BookingEntity updatedBooking = bookingRepository.save(booking);
            return convertToDto(updatedBooking);
        }
        return null;
    }

    public boolean deleteBooking(Long id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private BookingDto convertToDto(BookingEntity bookingEntity) {
        return objectMapper.convertValue(bookingEntity, BookingDto.class);
    }

    private BookingEntity convertToEntity(BookingDto bookingDto) {
        return objectMapper.convertValue(bookingDto, BookingEntity.class);
    }
}
