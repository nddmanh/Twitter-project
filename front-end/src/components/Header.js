import React from 'react';
import './../css/Header.css';

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">
        <a href="/">Twitter</a>
      </h1>
      <nav>
        <ul className="main-nav">
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">Register</a>
          </li>
          <li>
            <span href="#" className="user-name">
            Hello, Duc Manh
            </span>
          </li>
          <li>
            <a href="#">Sign Out</a>  
          </li>
        </ul>
      </nav>
    </header>

    )
}
