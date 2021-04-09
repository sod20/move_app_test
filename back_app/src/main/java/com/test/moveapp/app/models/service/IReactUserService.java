package com.test.moveapp.app.models.service;

import org.springframework.data.repository.CrudRepository;

import com.test.moveapp.app.models.entity.ReactUser;

public interface IReactUserService extends CrudRepository<ReactUser, Long> {

	public ReactUser findByUsername(String username);
}
