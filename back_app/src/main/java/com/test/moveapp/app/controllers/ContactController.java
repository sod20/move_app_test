package com.test.moveapp.app.controllers;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.test.moveapp.app.models.entity.Contact;
import com.test.moveapp.app.models.entity.LoginData;
import com.test.moveapp.app.models.service.IContactService;

@RestController
@RequestMapping("api/contacts")
public class ContactController {
	
	@Autowired
	private IContactService contactService;
	
	private static final Logger logger = LoggerFactory.getLogger(ContactController.class);
	
	@CrossOrigin(origins="*")
	@RequestMapping(method = RequestMethod.POST, value="/login", produces = {"application/json"})
	public ResponseEntity<String> login(@RequestBody LoginData loginData) {
		logger.info("Login Data: email: " + loginData.getEmail() + " - password: " + loginData.getPassword());
		return ResponseEntity.ok("Soon");
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/signup", produces = {"application/json"})
	public ResponseEntity<Contact> signup(@RequestBody Contact contact) {
		logger.info("SignUp Data: email: " + contact.getEmail() + " - password: " + contact.getPassword());
		return ResponseEntity.ok(contact);
	}
	
	public void edit() {
		
	}
	
	@CrossOrigin(origins="*")
	@RequestMapping(value="/list", produces = {"application/json"})
	public ResponseEntity<List<Contact>> list() {
		ArrayList<Contact> contacts = (ArrayList<Contact>) contactService.findAll();
		return ResponseEntity.ok(contacts);
	}
	
}
