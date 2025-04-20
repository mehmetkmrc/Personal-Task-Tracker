import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5047/api', // backend çalıştığı portu kontrol et
});

// Tüm görevleri getir
export const fetchTasks = ({ projectId, status, userId, startDate, endDate}) => 
  API.get('/task', { 
    params: { 
      projectId: projectId || undefined, 
      status: status || undefined, 
      userId: userId || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined 
    } 
  });


// Yeni görev oluştur
export const createTask = (taskData) => API.post('/task', taskData);

// Kullanıcıya ait projeleri getir
export const fetchProjectsByUserId = (userId) =>
  API.get('/project/by-user', { params: { userId } });


export default API;
