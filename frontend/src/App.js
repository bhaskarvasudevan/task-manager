import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = '/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'PENDING' });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Failed to fetch tasks');
    }
    setLoading(false);
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    try {
      await axios.post(API_URL, newTask);
      setNewTask({ title: '', description: '', status: 'PENDING' });
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${editingTask.id}`, editingTask);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return '#ffc107';
      case 'IN_PROGRESS': return '#2196f3';
      case 'COMPLETED': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📋 Task Manager</h1>
      </header>

      <div className="container">
        <div className="form-section">
          <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
          <form onSubmit={editingTask ? updateTask : createTask}>
            <input
              type="text"
              placeholder="Task Title"
              value={editingTask ? editingTask.title : newTask.title}
              onChange={(e) => editingTask 
                ? setEditingTask({...editingTask, title: e.target.value})
                : setNewTask({...newTask, title: e.target.value})
              }
              required
            />
            <textarea
              placeholder="Task Description"
              value={editingTask ? editingTask.description : newTask.description}
              onChange={(e) => editingTask
                ? setEditingTask({...editingTask, description: e.target.value})
                : setNewTask({...newTask, description: e.target.value})
              }
              rows="3"
            />
            <select
              value={editingTask ? editingTask.status : newTask.status}
              onChange={(e) => editingTask
                ? setEditingTask({...editingTask, status: e.target.value})
                : setNewTask({...newTask, status: e.target.value})
              }
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <div className="button-group">
              <button type="submit" className="btn-primary">
                {editingTask ? 'Update Task' : 'Create Task'}
              </button>
              {editingTask && (
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setEditingTask(null)}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="tasks-section">
          <h2>Tasks ({tasks.length})</h2>
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="no-tasks">No tasks yet. Create one above!</p>
          ) : (
            <div className="tasks-grid">
              {tasks.map(task => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(task.status) }}
                    >
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="task-description">{task.description || 'No description'}</p>
                  <div className="task-footer">
                    <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
                    <div className="task-actions">
                      <button 
                        className="btn-edit"
                        onClick={() => setEditingTask(task)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
