import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const getTasks = async () => {
      try {
        const { data } = await fetchTasks({ projectId, status });
        setTasks(data);
      } catch (error) {
        console.error('Görevler alınamadı:', error);
      }
    };

    getTasks();
  }, [projectId, status]);

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Görev Listesi</h2>

      <div className="filter-section">
        <div className="filter-item">
          <label htmlFor="projectId">Proje ID:</label>
          <input 
            id="projectId"
            type="number" 
            value={projectId} 
            onChange={e => setProjectId(e.target.value)} 
            placeholder="Proje ID girin"
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
          <p className="empty-message">Listelenecek görev bulunamadı.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
