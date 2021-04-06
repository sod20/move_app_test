package com.test.moveapp.app.models.service;

import org.springframework.data.repository.CrudRepository;

import com.test.moveapp.app.models.entity.Contact;

public interface IContactService extends CrudRepository<Contact, Long> {
	
}
