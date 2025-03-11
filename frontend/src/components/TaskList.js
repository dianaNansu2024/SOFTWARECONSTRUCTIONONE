import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', assigned_to: '' });
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/tasks/?page=${page}&search=${search}`)
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }, [page, search]);

    const handleCreateTask = () => {
        axios.post('http://127.0.0.1:8000/tasks/', newTask)
            .then(response => {
                setTasks([...tasks, response.data]);
                setNewTask({ title: '', description: '', assigned_to: '' });
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Tasks</h1>
            <input
                type="text"
                placeholder="Search tasks"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.description} - Assigned to: {task.assigned_to}
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Assigned To"
                    value={newTask.assigned_to}
                    onChange={(e) => setNewTask({ ...newTask, assigned_to: e.target.value })}
                />
                <button onClick={handleCreateTask}>Create Task</button>
            </div>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default TaskList;