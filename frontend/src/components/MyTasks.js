// src/components/MyTasks.js
import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';
import './TaskList.css';  // aynı şık CSS kullanılabilir

const MyTasks = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const { data } = await fetchTasks({ ownerId: userId, status, dueDate });
        setTasks(data);
      } catch (error) {
        console.error('Kişisel görevler alınamadı:', error);
      }
    };

    if (userId) {
      loadTasks();
    }
  }, [userId, status, dueDate]);

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Tüm Görevlerim</h2>

      <div className="filter-section">
        <div className="filter-item">
          <label htmlFor="dueDate">Tarihe göre:</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="status">Durum:</label>
          <select
            id="status"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="">Hepsi</option>
            <option value="0">Bekliyor</option>
            <option value="1">Devam Ediyor</option>
            <option value="2">Tamamlandı</option>
          </select>
        </div>
      </div>

      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task.id} className="task-item">
              <h4>{task.title}</h4>
              <p><strong>Durum:</strong> {task.status === '0' ? 'Bekliyor' : task.status === '1' ? 'Devam Ediyor' : 'Tamamlandı'}</p>
              <p><strong>Proje:</strong> #{task.projectId}</p>
            </li>
          ))
        ) : (
          <p className="empty-message">Henüz atanmış bir görev yok.</p>
        )}
      </ul>
    </div>
  );
};

export default MyTasks;
