import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Context'i kullan
import './Navbar.css';

const Navbar = () => {
  const { userId } = useUser(); // Context'ten userId al

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Task Tracker</div>
        <div className="navbar-links">
          <Link to={`/my-tasks${userId ? `?UserId=${userId}` : ''}`} className="nav-link">
            Tüm Görevlerim
          </Link>
          <Link to={`/daily-tasks${userId ? `?UserId=${userId}` : ''}`} className="nav-link">
            Günlük Görevlerim
          </Link>
          <Link to={`/add-task${userId ? `?UserId=${userId}` : ''}`} className="nav-link">
            Yeni Görev
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;