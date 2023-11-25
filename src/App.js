import React, { useState } from 'react';

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const user = storedUsers.find((u) => u.username === formData.username && u.password === formData.password);

      if (user) {
        alert('Login successful!');
      } else {
        alert('Invalid username or password.');
      }
    } else {
      
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const existingUser = storedUsers.find((u) => u.username === formData.username);

      if (existingUser) {
        alert('Username already exists. Please choose a different username.');
      } else {
        const newUser = { username: formData.username, password: formData.password };
        const updatedUsers = [...storedUsers, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        alert('Signup successful! You can now login.');
        
        setFormData({
          username: '',
          password: '',
        });
      }
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Signup'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <br />
        {!isLogin && (
          <label>
            Confirm Password:
            <input type="password" name="confirmPassword" required />
          </label>
        )}
        <br />
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <span onClick={handleToggle} style={{ color: 'blue', cursor: 'pointer' }}>
          {isLogin ? 'Signup' : 'Login'}
        </span>
      </p>
    </div>
  );
};

export default LoginSignupPage;