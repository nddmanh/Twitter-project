import React from 'react';
import './../css/Auth.css';

export default function Login() {
  return (
    <section className="auth-container">
      <form className="auth-form">
        <h2>Enter yout account</h2>
        <div className="error-message">Error: Your password is not correct</div>
        <input id type="email" name="email" placeholder="Email" required />
        <input id type="password" name="password" placeholder="Password" required />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </section>
  )
}
