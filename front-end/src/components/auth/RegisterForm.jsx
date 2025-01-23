import React, { useState } from "react";
import { registerUser } from "../../services/UserService";
import InputField from "./InputField";
import "./AuthForm.css";

const RegisterForm = ({ setShowForm, setShowModal }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  // Handle input changes and update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle role selection change
  const handleRoleChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, role: value });
  };

  // Form validation before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name cannot be blank";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name cannot be blank";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"; 
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email should be valid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"; 
    } else if (formData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters long";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role (Student or Landlord)"; 
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no validation errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Prevent form submission if validation fails
    }

    try {
      await registerUser(formData); // Attempt to register user
      alert("Registration successful!"); // Show success message
      setShowForm("login"); // Show login form after successful registration
    } catch (error) {
      console.error("Registration Error:", error); 
      alert("Registration failed!"); 
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      {errors.firstName && <span className="error">{errors.firstName}</span>} {/* Display error for first name */}

      <InputField
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      {errors.lastName && <span className="error">{errors.lastName}</span>} {/* Display error for last name */}

      <InputField
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      {errors.email && <span className="error">{errors.email}</span>} {/* Display error for email */}

      <InputField
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      {errors.password && <span className="error">{errors.password}</span>} {/* Display error for password */}

      <div className="role-selection">
        <label>
          <input
            type="radio"
            name="role"
            value="ROLE_STUDENT"
            checked={formData.role === "ROLE_STUDENT"}
            onChange={handleRoleChange}
          />
          Student
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="ROLE_LANDLORD"
            checked={formData.role === "ROLE_LANDLORD"}
            onChange={handleRoleChange}
          />
          Landlord
        </label>
      </div>
      {errors.role && <span className="error">{errors.role}</span>} {/* Display error for role */}

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
