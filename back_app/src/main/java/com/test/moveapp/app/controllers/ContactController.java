package com.test.moveapp.app.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.test.moveapp.app.models.entity.Contact;
import com.test.moveapp.app.models.entity.ApiResponse;
import com.test.moveapp.app.models.entity.RegisterRequest;
import com.test.moveapp.app.models.service.IContactService;

@RestController
@CrossOrigin("*")
@RequestMapping("api/contacts")
public class ContactController {
	
	@Autowired
	private IContactService contactService;
	
	@RequestMapping(value="/update/{id}", method = RequestMethod.POST, produces = {"application/json"})
	public ResponseEntity<Object> edit(@PathVariable Long id, @Valid @RequestBody RegisterRequest data, BindingResult result) {
		if(result.hasErrors()) {
			Map<String, String> errors = new HashMap<>();
			result.getFieldErrors().forEach( err -> {
				errors.put(err.getField(), err.getDefaultMessage());
			});
			return ResponseEntity.ok(errors); 
		}
		Contact c = contactService.findById(id).orElse(null);
		if (c == null) {
			
		}
		return ResponseEntity.ok("");
	}
	
	@RequestMapping(value="/delete/{id}", method = RequestMethod.POST, produces = {"application/json"})
	public ResponseEntity<Object> delete(@PathVariable Long id) {
		
		return ResponseEntity.ok("");
	}
	
	@RequestMapping(value="/list", produces = {"application/json"})
	public ResponseEntity<ListResponse> list() {
		ArrayList<Contact> contacts = (ArrayList<Contact>) contactService.findAll();
		ApiResponse response = new ApiResponse();
		response.code = 200;
		response.setMessage("contacts data");
		response.setData(contacts);
		return ResponseEntity.ok(response);
	}
	
}
