import React, { useState } from 'react';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleUpdateClick = () => {
        updateTodo(newTitle, todo.id);
    };

    return (
        <li key={todo.id}>
            <input
                type="checkbox"
                checked={todo.status}
                onChange={(e) => {
                    updateTodo(e.target.checked, todo.id);
                }}
            />
            <span className={todo.status ? 'active' : ''}>{todo.title}</span>
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
            />
            <button onClick={handleUpdateClick}>Обновить</button>
            <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
        </li>
    );
};

export default TodoItem;
