document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    const API_URL = "http://localhost:8080/tasks"; // Ensure this matches your Spring Boot endpoint

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const task = taskInput.value;

        // Send the new task to the backend
        try {
            await addTask(task);
            taskInput.value = ''; // Clear input
            loadTasks(); // Reload tasks
        } catch (error) {
            alert(error.message); // Handle error
        }
    });

    async function loadTasks() {
        try {
            const response = await fetch(API_URL); // Make sure this matches your endpoint
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            const tasks = await response.json();
            taskList.innerHTML = ''; // Clear the current list
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task;
                taskList.appendChild(li);
            });
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    }

    async function addTask(task) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task }),
            });
            if (!response.ok) {
                throw new Error('Failed to add task');
            }
        } catch (error) {
            console.error("There was a problem with the add task operation:", error);
            throw error; // Re-throw error for handling in the submit event
        }
    }

    loadTasks(); // Initial load of tasks
});