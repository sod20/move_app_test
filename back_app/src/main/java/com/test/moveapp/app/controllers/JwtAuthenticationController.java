package com.test.moveapp.app.controllers;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.test.moveapp.app.models.service.IContactService;
import com.test.moveapp.app.models.service.IReactUserService;
import com.test.moveapp.app.models.service.JwtUserDetailsService;

import com.test.moveapp.app.config.JwtTokenUtil;
import com.test.moveapp.app.models.entity.ApiResponse;
import com.test.moveapp.app.models.entity.Contact;
import com.test.moveapp.app.models.entity.RegisterRequest;
import com.test.moveapp.app.models.entity.RegisterResponse;
import com.test.moveapp.app.models.entity.JwtRequest;
import com.test.moveapp.app.models.entity.JwtResponse;
import com.test.moveapp.app.models.entity.ReactUser;

@RestController
@CrossOrigin
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;
	
	@Autowired
	private IContactService contactService;
	
	@Autowired
	private IReactUserService userService;
	
	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationController.class);

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

		logger.info("getUsername: " + authenticationRequest.getUsername());
		logger.info("getPassword: " + authenticationRequest.getPassword());
		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);
		
		ReactUser rUser = userService.findByUsername(authenticationRequest.getUsername());
		Contact c = contactService.findByEmail(authenticationRequest.getUsername());
		c.setLastLogin(new Date());
		c.setModified(new Date());
		contactService.save(c);
		return ResponseEntity.ok(new JwtResponse(token));
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest data, BindingResult result) {

		if(result.hasErrors()) {
			Map<String, String> errors = new HashMap<>();
			result.getFieldErrors().forEach( err -> {
				errors.put(err.getField(), err.getDefaultMessage());
			});
			ApiResponse apiResponse = new ApiResponse();
			apiResponse.code = 400;
			apiResponse.message = "Validation error";
			apiResponse.data = errors;
			return ResponseEntity.ok(apiResponse); 
		}
		
		// create ReactUser
		ReactUser user = new ReactUser();
		user.setUsername(data.getEmail());
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		user.setPassword(encoder.encode(data.getPassword()));
		user.setEnabled(true);

		final UserDetails userDetails = userDetailsService.registrationUser(data.getEmail(), encoder.encode(data.getPassword()));
		final String token = jwtTokenUtil.generateToken(userDetails);

		user.setToken(token);
		userService.save(user);
		// create contact
		Contact c = new Contact();
		c.setEmail(data.getEmail());
		c.setPhones(data.getPhones());
		// prepresist load created, modified and last_login data
		contactService.save(c);
		
		// return ResponseEntity.ok(data);
		ApiResponse apiResponse = new ApiResponse();
		apiResponse.code = 200;
		apiResponse.message = "registration success";
		apiResponse.data = new RegisterResponse(c.getId(), c.getCreated(), c.getModified(), c.getLastLogin(), token, c.getIsActive());
		return ResponseEntity.ok(apiResponse);
	}
}
