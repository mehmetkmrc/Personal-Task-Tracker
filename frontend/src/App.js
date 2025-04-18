import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <div className="App">
      <h1>Görev Takip Sistemi</h1>
      <TaskForm onTaskCreated={() => setReloadKey(prev => prev + 1)} />
      <TaskList key={reloadKey} />
    </div>
  );
}

export default App;
