document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    const API_URL = "http://localhost:8080/tasks";

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const task = taskInput.value;
        await addTask(task);
        taskInput.value = '';
        loadTasks();

    });

    async function loadTasks() {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            taskList.appendChild(li);
        });
    }

    async function addTask(task) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task }),
        });

    }

    loadTasks();
});