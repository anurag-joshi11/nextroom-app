package com.nextroom.housing.app.service.impl;

import com.nextroom.housing.app.dto.UserRequestDTO;
import com.nextroom.housing.app.exception.UserAlreadyExistsException;
import com.nextroom.housing.app.model.User;
import com.nextroom.housing.app.repository.UserRepository;
import com.nextroom.housing.app.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.nextroom.housing.app.constants.Constants.USER_ALREADY_EXISTS;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void saveUser(UserRequestDTO userRequestDTO) {
        // Check if user already exists by email
        Optional<User> existingUser = userRepository.findByEmail(userRequestDTO.getEmail());
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException(USER_ALREADY_EXISTS);
        }

        // Map the DTO to User entity and save
        User user = modelMapper.map(userRequestDTO, User.class);
        user.setStatus(true);
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }
}