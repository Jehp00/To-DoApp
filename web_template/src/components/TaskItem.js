import React from 'react';

const TaskItem = ({ task, onDelete, onMarkAsDone }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onMarkAsDone(task.id)}
      />
      {task.taskName} - {task.description} - {task.completed ? 'Completed' : 'Pending'}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
