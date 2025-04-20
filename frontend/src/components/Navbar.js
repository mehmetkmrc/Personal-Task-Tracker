import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get('userId');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Task Tracker</div>
        <div className="navbar-links">
          <Link to={`/my-tasks?userId=${userId}`} className="nav-link">Tüm Görevlerim</Link>
          <Link to={`/daily-tasks?userId=${userId}`} className="nav-link">Günlük Görevlerim</Link>
          <Link to={`/add-task?userId=${userId}`} className="nav-link">Yeni Görev</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
