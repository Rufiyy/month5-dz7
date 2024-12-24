import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/todos')
            .then((response) => response.json())
            .then((data) => setTodos(data));
    }, []);

    const updateTodo = (newTitle, id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, title: newTitle } : todo
        );
        setTodos(updatedTodos);

        fetch(`http://localhost:5000/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle }),
        });
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);

        fetch(`http://localhost:5000/todos/${id}`, {
            method: 'DELETE',
        });
    };

    const addTodo = () => {
        if (newTodoTitle.trim() === '') return;

        const newTodo = {
            title: newTodoTitle,
            status: false,
        };

        fetch('http://localhost:5000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        })
            .then((response) => response.json())
            .then((data) => {
                setTodos([...todos, data]);
                setNewTodoTitle('');
            });
    };

    return (
        <div>
            <h1>Список задач</h1>
            <div>
                <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    placeholder="Введите новую задачу"
                />
                <button onClick={addTodo}>Добавить задачу</button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default App;
