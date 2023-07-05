import { useState } from 'react';
import axios from 'axios';

export default function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/register', {
        email,
        password,
      });

      if (response.data.success) {
        // Registration successful, perform actions like redirecting or showing success message
      } else {
        // Registration failed, handle error
      }
    } catch (error) {
      // Handle API error or network error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}
