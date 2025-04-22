import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserSelectionModal.css';
import { useUser } from '../context/UserContext'; // Context'i kullan

const UserSelectionModal = ({ onClose }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { setUserId } = useUser(); // Context'ten setUserId al

  // Fetch users from the backend
  useEffect(() => {
    // For simplicity, hardcoding users since we know Ayşe Demir and Ali Yılmaz exist
    // In a real app, fetch from API: axios.get('/api/users')
    setUsers([
      { Id: 1, Name: 'Ali Yılmaz' },
      { Id: 2, Name: 'Ayşe Demir' }
    ]);
  }, []);

  const handleUserSelect = (userId) => {
    setUserId(userId); // Context'e userId'yi kaydet
    navigate(`/add-task?UserId=${userId}`);
    onClose(); // Close the modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Task Tracker'a Hoş Geldiniz!</h1>
        <h3>Lütfen Kullanıcı Seçiniz:</h3>
        <div className="user-list">
          {users.map((user) => (
            <button
              key={user.Id}
              className="user-button"
              onClick={() => handleUserSelect(user.Id)}
            >
              {user.Name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSelectionModal;