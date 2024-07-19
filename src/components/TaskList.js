import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the tasks!', error);
            });
    }, []);

    const changeCompleted = (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            axios.put(`http://localhost:8080/tasks/${taskId}`, {
                ...task,
                completed: !task.completed
            })
                .then(response => {
                    setTasks(tasks.map(t =>
                        t.id === taskId ? response.data : t
                    ));
                })
                .catch(error => {
                    console.error('There was an error updating the task!', error);
                });
        }
    };

    return (
        <div>
            <h1>Task List</h1>
            {tasks.map(task => (
                <div key={task.id}>
                    {task.name} - {task.completed ? "Completed" : "Not Completed"}
                    <Button onClick={() => changeCompleted(task.id)}>
                        Change status
                    </Button>
                </div>
            ))}
        </div>
    );
};


export default TaskList;
