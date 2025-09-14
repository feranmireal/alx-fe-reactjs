// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
      <Link to="/" style={{ marginRight: 12 }}>Home</Link>
      <Link to="/add" style={{ marginRight: 12 }}>Add Recipe</Link>
      <Link to="/favorites" style={{ marginRight: 12 }}>Favorites</Link>
      <Link to="/recommendations">Recommendations</Link>
    </nav>
  );
}
