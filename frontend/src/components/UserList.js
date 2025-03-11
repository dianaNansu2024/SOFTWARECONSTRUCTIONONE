import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', email: '' });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/users/')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleCreateUser = () => {
        axios.post('http://127.0.0.1:8000/users/', newUser)
            .then(response => {
                setUsers([...users, response.data]);
                setNewUser({ username: '', email: '' });
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username} - {user.email}</li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <button onClick={handleCreateUser}>Create User</button>
            </div>
        </div>
    );
};

export default UserList;