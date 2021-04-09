package com.test.moveapp.app.models.entity;

import java.io.Serializable;

public class JwtResponse implements Serializable {

	private final String jwttoken;

	public JwtResponse(String jwttoken) {
		this.jwttoken = jwttoken;
	}

	public String getToken() {
		return this.jwttoken;
	}

	private static final long serialVersionUID = -6386534080401120463L;
}