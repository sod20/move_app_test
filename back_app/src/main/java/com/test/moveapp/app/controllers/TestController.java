package com.test.moveapp.app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

	@RequestMapping({"/test"})
	public String firstPage() {
		return "Hi";
	}
}
