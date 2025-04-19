import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskForm from './components/TaskForm'; // Assuming this is your task form component
import TaskList from './components/TaskList'; // Assuming this is your task list component
import UserSelectionModal from './components/UserSelectionModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      {isModalOpen && <UserSelectionModal onClose={closeModal} />}
      <div className="app-container">
      <Routes>
        <Route path="/add-task" element={<>
              <TaskForm />
              <TaskList />
            </>} />
        
        {/* Add other routes as needed */}
      </Routes>
      </div>
    </Router>
  );
}

export default App;