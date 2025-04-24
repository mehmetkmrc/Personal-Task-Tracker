import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5047/api', // backend çalıştığı portu kontrol et
});

// Tüm görevleri getir
export const fetchTasks = ({ projectId, status, userId, startDate, endDate, dueDate, isDaily }) => 
  API.get('/task', { 
    params: { 
      projectId: projectId || undefined, 
      status: status || undefined, 
      userId: userId || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      dueDate: dueDate || undefined,
      isDaily: isDaily || undefined,
    } 
  });


// Yeni görev oluştur
export const createTask = (taskData) => API.post('/task', taskData);

// Kullanıcıya ait projeleri getir
export const fetchProjectsByUserId = (userId) =>
  API.get('/project/by-user', { params: { userId } });

// Görevin DueDate değerini güncelle
export const updateTaskDueDate = (taskId, dueDate) =>
  API.put(`/task/${taskId}/due-date`, { dueDate });

// Görevin durumunu güncelle
export const updateTaskStatus = (taskId, status) =>
  API.put(`/task/${taskId}/status`, { status });

// Yorumları getir
export const fetchTaskComments = (taskId) =>
  API.get(`/tasks/${taskId}/comments`);

// Yorum ekle
export const addTaskComment = (taskId, commentData) =>
  API.post(`/tasks/${taskId}/comments`, commentData);



export default API;
