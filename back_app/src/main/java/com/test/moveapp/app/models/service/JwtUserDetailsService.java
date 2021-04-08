package com.test.moveapp.app.models.service;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.test.moveapp.app.models.entity.Contact;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	public IContactService clientService;
	
	private static final Logger logger = LoggerFactory.getLogger(JwtUserDetailsService.class);
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if ("testuser".equals(username)) {
			return new User("testuser", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6",
					new ArrayList<>());
		} else {
			Contact c = this.clientService.findByEmail(username);
			
			if (c == null) {
				logger.info("JwtUserDetailsService::: Contact not found");
			} else {
				logger.info("JwtUserDetailsService::: Contact email: " + c.getEmail());
				return new User(c.getEmail(), c.getEmail(),
						new ArrayList<>());
			}
			
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	}
}
