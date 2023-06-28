package com.pi.digitalbooking.services;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pi.digitalbooking.DTO.BookingCreateDto;
import com.pi.digitalbooking.DTO.BookingDto;
import com.pi.digitalbooking.entities.AppUser;
import com.pi.digitalbooking.entities.BookingEntity;
import com.pi.digitalbooking.enums.Status;
import com.pi.digitalbooking.models.Product;
import com.pi.digitalbooking.repository.BookingRepository;
import com.pi.digitalbooking.repository.ProductRepository;
import com.pi.digitalbooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ObjectMapper objectMapper;
    private ProductRepository productRepository;
    private UserRepository userRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, ObjectMapper objectMapper, ProductRepository productRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.objectMapper = objectMapper;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
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

    public List<BookingDto> getBookingByUser(String userEmail) throws Exception{

        Optional<AppUser> optionalUser = Optional.ofNullable(userRepository.findByEmail(userEmail));

        if(!optionalUser.isPresent()) {
            throw new Exception("USER_NOT_FOUND");
        }

        List<BookingEntity> bookingEntities = bookingRepository.findBookingByUserAndStatus(optionalUser.get(), Status.ACTIVE);
        return bookingEntities.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public BookingDto createBooking(BookingCreateDto bookingDto) {
        BookingEntity booking = convertToEntity(bookingDto);
        booking.setStatus(Status.ACTIVE);
        booking.setComments(bookingDto.getComments());
        Product product = productRepository.getProductByCodeProductAndStatus(bookingDto.getProduct().getCodeProduct(), Status.ACTIVE);
        booking.setProduct(product);
        AppUser user = userRepository.findByEmail(bookingDto.getUser().getEmail());
        booking.setUser(user);
        BookingEntity createdBooking = bookingRepository.save(booking);
        return convertToDto(createdBooking);
    }

    public BookingDto updateBooking(Long id, BookingCreateDto bookingDto) throws JsonMappingException {
        Optional<BookingEntity> optionalBooking = bookingRepository.findById(id);
        if (optionalBooking.isPresent()) {
            BookingEntity booking = optionalBooking.get();
            //TODO: finish update user and product
            objectMapper.updateValue(bookingDto, booking);
            booking.setId(id);
            BookingEntity updatedBooking = bookingRepository.save(booking);
            return convertToDto(updatedBooking);
        }
        return null;
    }

    public boolean deleteBooking(Long id) {
        if (bookingRepository.existsById(id)) {
            BookingEntity booking = bookingRepository.getById(id);
            booking.setStatus(Status.DELETED);
            bookingRepository.save(booking);
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
    private BookingEntity convertToEntity(BookingCreateDto bookingDto) {
        return objectMapper.convertValue(bookingDto, BookingEntity.class);
    }
}
