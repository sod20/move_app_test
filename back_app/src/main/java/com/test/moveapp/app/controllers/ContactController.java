package com.test.moveapp.app.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.test.moveapp.app.models.entity.Contact;
import com.test.moveapp.app.models.service.IContactService;

@Controller
public class ContactController {
	
	@Autowired
	private IContactService contactService;
	
	@CrossOrigin(origins="*")
	@RequestMapping(value="contacts/list", produces = {"application/json"})
	public ResponseEntity<List<Contact>> list() {
		ArrayList<Contact> contacts = (ArrayList<Contact>) contactService.findAll();
		return ResponseEntity.ok(contacts);
	}
	
}
