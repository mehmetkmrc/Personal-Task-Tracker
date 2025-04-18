import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5047/api', // backend çalıştığı portu kontrol et
});

// Tüm görevleri getir
export const fetchTasks = (params) => API.get('/task', { params });

// Yeni görev oluştur
export const createTask = (taskData) => API.post('/task', taskData);

export default API;
