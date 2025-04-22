import React, { useEffect, useState } from 'react';
import { fetchTasks, fetchProjectsByUserId, updateTaskDueDate } from '../services/api';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const location = useLocation();

  // Get UserId from URL
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('UserId');

  // Tarih formatlama fonksiyonu
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'd MMMM yyyy, HH:mm', { locale: tr });
  };

  // Günlük görevlere ekleme fonksiyonu
  const addToDailyTasks = async (taskId) => {
    try {
      const today = new Date().toISOString().split('T')[0]; // Bugünün tarihi (YYYY-MM-DD)
      await updateTaskDueDate(taskId, today);
      // Görev listesini yenile
      const { data } = await fetchTasks({ projectId, status, userId, startDate, endDate });
      setTasks(data);
      alert('Görev günlük görevlere eklendi!');
    } catch (error) {
      console.error('Görev günlük görevlere eklenemedi:', error);
      alert('Görev eklenirken bir hata oluştu.');
    }
  };

  // Fetch projects and tasks
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchProjectsByUserId(userId);
        setProjects(response.data);
      } catch (error) {
        console.error('Projeler yüklenirken hata oluştu:', error);
      }
    };

    const getTasks = async () => {
      try {
        const { data } = await fetchTasks({ projectId, status, userId, startDate, endDate });
        setTasks(data);
      } catch (error) {
        console.error('Görevler alınamadı:', error);
      }
    };

    if (userId) {
      loadProjects();
      getTasks();
    }
  }, [userId, projectId, status, startDate, endDate]);

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
        <div className="filter-item">
          <label htmlFor="startDate">Başlangıç Tarihi:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="endDate">Bitiş Tarihi:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              <h4>{task.title}</h4>
              <p>
                <strong>Durum:</strong>{' '}
                {task.status === 0 ? 'Bekliyor' : task.status === 1 ? 'Devam Ediyor' : 'Tamamlandı'}
              </p>
              <p>
                <strong>Proje:</strong> {task.projectName}
              </p>
              <p>
                <strong>Oluşturan:</strong> {task.createdByName}
              </p>
              <p>
                <strong>Oluşturma Tarihi:</strong> {formatDate(task.createdAt)}
              </p>
              <button
                className="add-to-daily-btn"
                onClick={() => addToDailyTasks(task.id)}
              >
                Günlük Görevlere Ekle
              </button>
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