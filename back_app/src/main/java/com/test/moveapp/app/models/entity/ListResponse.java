package com.test.moveapp.app.models.entity;

import java.io.Serializable;
import java.util.List;

public class ListResponse implements Serializable {
	
	private static final long serialVersionUID = -6386534080401120463L;
	
	private String message;
	private List<Contact> data;
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public List<Contact> getData() {
		return data;
	}
	public void setData(List<Contact> data) {
		this.data = data;
	}
	
	

}
