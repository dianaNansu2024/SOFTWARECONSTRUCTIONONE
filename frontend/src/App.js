import React from 'react';
import UserList from './components/UserList';
import TaskList from './components/TaskList';

function App() {
    return (
        <div className="App">
            <UserList />
            <TaskList />
        </div>
    );
}

export default App;