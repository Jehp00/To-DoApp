import React, { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ taskName: '', description: '' });

  useEffect(() => {
    // Fetch tasks from the Spring Boot MongoDB API
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const addTask = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskName: newTask.taskName,
          description: newTask.description,
          completed: false,
        }),
      });

      if (response.status === 201) {
        // Task created successfully, fetch updated task list
        const updatedTasks = await response.json();
        setTasks(updatedTasks);

        // Clear the input fields
        setNewTask({ taskName: '', description: '' });
      } else {
        console.error('Error adding task:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const markTaskAsDone = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: true,
        }),
      });

      if (response.status === 200) {
        // Task updated successfully, fetch updated task list
        const updatedTasks = await response.json();
        setTasks(updatedTasks);
      } else {
        console.error('Error marking task as done:', response.statusText);
      }
    } catch (error) {
      console.error('Error marking task as done:', error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.taskName}</td>
              <td>{task.description}</td>
              <td>{task.completed ? 'Yes' : 'No'}</td>
              <td>
                {!task.completed && (
                  <button onClick={() => markTaskAsDone(task.id)}>Mark as Done</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.taskName}
          onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
};

export default TaskList;
