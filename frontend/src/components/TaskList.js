import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';

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
    <div>
      <h2>Görev Listesi</h2>

      <div>
        <label>Proje ID:</label>
        <input type="number" value={projectId} onChange={e => setProjectId(e.target.value)} />

        <label>Durum:</label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">Hepsi</option>
          <option value="0">Bekliyor</option>
          <option value="1">Devam Ediyor</option>
          <option value="2">Tamamlandı</option>
        </select>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> – {task.status} – Proje #{task.projectId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
