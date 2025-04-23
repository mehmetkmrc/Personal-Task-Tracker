import React, { useEffect, useState } from 'react';
import { fetchTasks, updateTaskStatus } from '../services/api';
import '../components/TaskList.css';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';

const DailyTasks = () => {
  const { userId } = useUser();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Görevleri yükle (sadece durumu 0 veya 1 olanlar)
  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const today = new Date().toISOString().split('T')[0];
      // CreatedById ile eşleşen, DueDate bugüne eşit ve status 0 veya 1 olan görevleri getir
      const { data } = await fetchTasks({ 
        userId, 
        dueDate: today,
        status: [0, 1], // Sadece bekleyen veya devam eden görevler
        isDaily: true
      });
      setTasks(data);
    } catch (error) {
      console.error('Günlük görevler alınamadı:', error);
      setError('Görevler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // Görevi tamamlandı olarak işaretle
  const markTaskAsCompleted = async (taskId) => {
    try {
      await updateTaskStatus(taskId, 2); // Status: 2 = Tamamlandı
      loadTasks(); // Listeyi yenile (artık tamamlanan görev listede görünmeyecek)
      toast.success('Görev tamamlandı olarak işaretlendi!');
    } catch (error) {
      console.error('Görev güncellenemedi:', error);
      toast.error('Görev güncellenirken bir hata oluştu.');
    }
  };

  useEffect(() => {
    if (userId) {
      loadTasks();
    }
  }, [userId]);

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Bugünkü Görevlerim</h2>

      {loading && <p className="loading-message">Görevler yükleniyor...</p>}
      {error && <p className="error-message">{error}</p>}

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
                <strong>Proje:</strong> #{task.projectId} - {task.projectName}
              </p>
              {task.status !== 2 && (
                <button
                  className="complete-task-btn"
                  onClick={() => markTaskAsCompleted(task.id)}
                >
                  Tamamlandı Olarak İşaretle
                </button>
              )}
            </li>
          ))
        ) : (
          !loading && <p className="empty-message">Bugün için seçilmiş görev yok.</p>
        )}
      </ul>
    </div>
  );
};

export default DailyTasks;