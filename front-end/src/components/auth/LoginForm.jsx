import React, { useState } from 'react';
import InputField from "./InputField";
import "./AuthForm.css";
import { loginUser } from '../../services/UserService'; 

const LoginForm = ({ onSuccess }) => {
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState({
      username: '',
      password: '',
    });

    const [errors, setErrors] = useState({
      username: '',
      password: '',
    });

    // Handle input changes and update user data
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
    };

    // Validate form data before submission
    const validateForm = () => {
      const newErrors = {};

      if (!userData.username.trim()) {
        newErrors.username = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(userData.username)) {
        newErrors.username = "Email should be valid";
      }

      if (!userData.password.trim()) {
        newErrors.password = "Password is required"; 
      }

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      try {
        const response = await loginUser({
          username: userData.username,
          password: userData.password,
        });

        if (response.status === 200) {
          setMessage('Login successful!'); // Show success message
        } else {
          setMessage('Login failed!'); // Show failure message
        }

        if (onSuccess) {
          onSuccess(); 
        }
      } catch (error) {
        alert('Login failed!'); 
      }
    };

    return (
      <div className="form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <InputField
            type="email"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          {errors.username && <span className="error">{errors.username}</span>}

          <InputField
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <button type="submit">Login</button>
        </form>
      </div>
    );
};

export default LoginForm;
