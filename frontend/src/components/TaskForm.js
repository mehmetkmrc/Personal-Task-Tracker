import React, { useState } from 'react';
import { createTask } from '../services/api';
import './TaskForm.css'; // CSS dosyasını ekledik.

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    projectId: '',
    ownerId: '',
    createdById: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
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
        createdById: ''
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
        <label htmlFor="projectId">Proje ID</label>
        <input
          type="number"
          id="projectId"
          name="projectId"
          placeholder="Proje ID"
          value={formData.projectId}
          onChange={handleChange}
          required
        />
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
