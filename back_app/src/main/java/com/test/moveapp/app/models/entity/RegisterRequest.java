package com.test.moveapp.app.models.entity;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.Pattern;

public class RegisterRequest implements Serializable {

	private static final long serialVersionUID = 4556422976747633251L;

	@Pattern(
		regexp = "^[A-Za-z0-9+_.-]+@dominio\\.cl",
		message = "email debe ser @dominio.cl")
	private String email;
	@Pattern(
		regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d.*\\d)[a-zA-Z\\d]{8,}$",
		message = "password debe tener al menos una mayuscula, una minuscula, 2 numeros y un largo minimo de 8 caracteres")
	private String password;
	private List<Phone> phones;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Phone> getPhones() {
		return phones;
	}

	public void setPhones(List<Phone> phones) {
		this.phones = phones;
	}

}
