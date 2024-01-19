import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import { v4 as uuidv4 } from 'uuid';

uuidv4();

export const TodoWrapperAPI = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from the Spring Boot MongoDB API
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tasks');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const addTodo = async (todo) => {
    try {
      const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskName: todo,
          completed: false,
        }),
      });

      if (response.status === 201) {
        // Todo created successfully, fetch updated todo list
        const updatedTodos = await response.json();
        setTodos(updatedTodos);
      } else {
        console.error('Error adding todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: true,
        }),
      });

      if (response.status === 200) {
        // Todo updated successfully, fetch updated todo list
        const updatedTodos = await response.json();
        setTodos(updatedTodos);
      } else {
        console.error('Error marking todo as complete:', response.statusText);
      }
    } catch (error) {
      console.error('Error marking todo as complete:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        // Todo deleted successfully, fetch updated todo list
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      } else {
        console.error('Error deleting todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = async (task, id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskName: task,
        }),
      });

      if (response.status === 200) {
        // Todo updated successfully, fetch updated todo list
        const updatedTodos = await response.json();
        setTodos(updatedTodos);
      } else {
        console.error('Error updating todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className='TodoWrapper'>
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={index} />
        ) : (
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};
