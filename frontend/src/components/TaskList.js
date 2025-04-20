import React, { useEffect, useState } from 'react';
import { fetchTasks, fetchProjectsByUserId } from '../services/api';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale'; // Türkçe için
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [status, setStatus] = useState('');
  const location = useLocation();

  // Get UserId from URL
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('UserId');

  // Tarih formatlama fonksiyonu
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'd MMMM yyyy, HH:mm', { locale: tr });
  };

  // Fetch projects and tasks
  useEffect(() => {
    // Fetch projects for the user
    const loadProjects = async () => {
      try {
        const response = await fetchProjectsByUserId(userId);
        setProjects(response.data);
      } catch (error) {
        console.error('Projeler yüklenirken hata oluştu:', error);
      }
    };

    // Fetch tasks based on filters
    const getTasks = async () => {
      try {
        const { data } = await fetchTasks({ projectId, status, userId }); // userId'yi ekle
        setTasks(data);
      } catch (error) {
        console.error('Görevler alınamadı:', error);
      }
    };

    if (userId) {
      loadProjects();
      getTasks();
    }
  }, [userId, projectId, status]);

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Görev Listesi</h2>

      <div className="filter-section">
        <div className="filter-item">
          <label htmlFor="projectId">Proje:</label>
          <select
            id="projectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Tüm Projeler</option>
            {projects.map((project) => (
              <option key={project.projectId} value={project.projectId}>
                {project.projectName}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="status">Durum:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              <h4>{task.title}</h4>
              <p><strong>Durum:</strong> {task.status === 0 ? 'Bekliyor' : task.status === 1 ? 'Devam Ediyor' : 'Tamamlandı'}</p>
              <p><strong>Proje:</strong> {task.projectName}</p> {/* ProjectName kullan */}
              <p><strong>Oluşturan:</strong> {task.createdByName}</p> {/* CreatedByName ekle */}
              <p><strong>Oluşturma Tarihi:</strong> {formatDate(task.createdAt)}</p> {/* CreatedAt ekle */}
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