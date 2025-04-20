import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { createTask, fetchProjectsByUserId } from '../services/api';
import './TaskForm.css'; // CSS dosyasını ekledik.

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    projectId: '',
    ownerId: '',
    createdById: '',
    status: '',
  });
  const [projects, setProjects] = useState([]); // Proje listesini tutmak için
  const location = useLocation();

  // URL'den UserId'yi al
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('UserId');

  // Projeleri backend'den getir
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchProjectsByUserId(userId);
        setProjects(response.data);
      } catch (error) {
        console.error('Projeler yüklenirken hata oluştu:', error);
      }
    };

    if (userId) {
      loadProjects();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'status' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask(formData);
      alert('Görev başarıyla eklendi!');
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        projectId: '',
        ownerId: '',
        createdById: '',
      });
      if (onTaskCreated) onTaskCreated();
    } catch (error) {
      alert('Görev eklenirken hata oluştu.');
      console.error(error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Yeni Görev Ekle</h3>

      <div className="form-group">
        <label htmlFor="title">Başlık</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Görev başlığı girin"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Açıklama</label>
        <textarea
          id="description"
          name="description"
          placeholder="Görev açıklaması"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Teslim Tarihi</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="projectId">Proje</label>
        <select
          id="projectId"
          name="projectId"
          value={formData.projectId}
          onChange={handleChange}
          required
        >
          <option value="">Proje seçin</option>
          {projects.map((project) => (
            <option key={project.projectId} value={project.projectId}>
              {project.projectName}
            </option>
          ))}
        </select>
      </div>


      <div className="form-group">
      <label htmlFor="status">Durum</label>
      <select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
      >
         <option value="">Durum Seçiniz</option>
        <option value="0">Bekliyor</option>
        <option value="1">Devam Ediyor</option>
        <option value="2">Tamamlandı</option>
      </select>
      </div>
    

      <div className="form-group">
        <label htmlFor="ownerId">Sahip (User ID)</label>
        <input
          type="number"
          id="ownerId"
          name="ownerId"
          placeholder="Sahip (User ID)"
          value={formData.ownerId}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="createdById">Oluşturan (User ID)</label>
        <input
          type="number"
          id="createdById"
          name="createdById"
          placeholder="Oluşturan (User ID)"
          value={formData.createdById}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-button">Görev Ekle</button>
    </form>
  );
};

export default TaskForm;
