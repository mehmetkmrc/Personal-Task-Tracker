import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';
import './TaskList.css';

const DailyTasks = ({ userId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const { data } = await fetchTasks({ ownerId: userId, dueDate: today });
        setTasks(data);
      } catch (error) {
        console.error('Günlük görevler alınamadı:', error);
      }
    };

    if (userId) {
      loadTasks();
    }
  }, [userId]);

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Bugünkü Görevlerim</h2>
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
          <p className="empty-message">Bugün için atanmış görev yok.</p>
        )}
      </ul>
    </div>
  );
};

export default DailyTasks;
