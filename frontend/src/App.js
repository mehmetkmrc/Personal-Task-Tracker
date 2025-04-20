import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import UserSelectionModal from './components/UserSelectionModal';
import MyTasks from './components/MyTasks';
import DailyTasks from './components/DailyTasks';
import Navbar from './components/Navbar';  // Navbar eklendi

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  const closeModal = (selectedUserId) => {
    setCurrentUserId(selectedUserId);
    setIsModalOpen(false);
  };

  return (
    <Router>
      {isModalOpen && <UserSelectionModal onClose={closeModal} />}
      {!isModalOpen && <Navbar />}  {/* Modal kapandıktan sonra Navbar gösterilir */}

      <div className="app-container">
        <Routes>
          <Route path="/add-task" element={<><TaskForm /><TaskList /></>} />

          <Route path="/my-tasks" element={
            currentUserId ? <MyTasks userId={currentUserId} /> : <Navigate/>
          } />

          <Route path="/daily-tasks" element={
            currentUserId ? <DailyTasks userId={currentUserId} /> : <Navigate/>
          } />

          <Route path="/" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
