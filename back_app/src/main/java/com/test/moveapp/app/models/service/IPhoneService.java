package com.test.moveapp.app.models.service;

import org.springframework.data.repository.CrudRepository;

import com.test.moveapp.app.models.entity.Phone;

public interface IPhoneService extends CrudRepository<Phone, Long>{

}
