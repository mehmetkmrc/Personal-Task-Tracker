import React, { useState } from 'react';
import { createTask } from '../services/api';

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
      if (onTaskCreated) onTaskCreated(); // Listeyi yenilemek için
    } catch (error) {
      alert('Görev eklenirken hata oluştu.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Yeni Görev Ekle</h3>

      <input
        type="text"
        name="title"
        placeholder="Başlık"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Açıklama"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />

      <input
        type="number"
        name="projectId"
        placeholder="Proje ID"
        value={formData.projectId}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="ownerId"
        placeholder="Sahip (User ID)"
        value={formData.ownerId}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="createdById"
        placeholder="Oluşturan (User ID)"
        value={formData.createdById}
        onChange={handleChange}
        required
      />

      <button type="submit">Görev Ekle</button>
    </form>
  );
};

export default TaskForm;
