import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // UserProvider'ı ekle
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import UserSelectionModal from './components/UserSelectionModal';
import MyTasks from './pages/MyTasks';
import DailyTasks from './pages/DailyTasks';
import Navbar from './components/Navbar';  // Navbar eklendi

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = (selectedUserId) => {
    setIsModalOpen(false);
  };

  return (
    <UserProvider>
      <Router>
        {isModalOpen && <UserSelectionModal onClose={closeModal} />}
        {!isModalOpen && <Navbar />}
        <div className="app-container">
          <Routes>
            <Route path="/add-task" element={<><TaskForm /><TaskList /></>} />
            <Route path="/my-tasks" element={<MyTasks />} />
            <Route path="/daily-tasks" element={<DailyTasks />} />
            <Route path="/" element={<TaskList />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
