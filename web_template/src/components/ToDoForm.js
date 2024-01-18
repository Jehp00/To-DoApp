import React, {useState} from 'react'

export const ToDoForm = ({addTodo}) => {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('')

    const handleSubmit = (e) => {
      // prevent default action
        e.preventDefault();
        if (value) {
          // add todo
          addTodo(value);
          // clear form after submission
          setValue('');
        }

        if (description) {
          addTodo(description)
          setDescription('')
        }
      };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='What is the task today?' />
    <input type="text" description={description} onChange={(e) => setDescription(e.target.description)} className="todo-input" placeholder='Description' />
    <button type="submit" className='todo-btn'>Add Task</button>
  </form>
  )
}