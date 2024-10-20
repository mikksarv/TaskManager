document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    async function loadTasks() {
        try {
            const response = await fetch('/tasks'); // Get tasks from backend
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const tasks = await response.json(); // Parse the JSON response
            displayTasks(tasks); // Display tasks in the list
        } catch (error) {
            console.error(error); // Log errors to the console
            alert('Error loading tasks: ' + error.message);
        }
    }


    // Function to display tasks in the task list
    function displayTasks(tasks) {
        taskList.innerHTML = ''; // Clear the current list
        tasks.forEach(task => {
            const li = document.createElement('li'); // Create a new list item
            li.textContent = task; // Set the text content to the task
            taskList.appendChild(li); // Add the list item to the task list
        });
    }

    // Handle form submission to add a new task
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission
        const task = taskInput.value.trim(); // Get the task input value

        // Send the new task to the backend
        try {
            if (task) { // Only add if task is not empty
                await addTask(task); // Call the function to add the task
                taskInput.value = ''; // Clear input
                loadTasks(); // Reload tasks
            } else {
                alert('Task cannot be empty'); // Alert if the task is empty
            }
        } catch (error) {
            alert('Failed to add task: ' + error.message); // Handle errors
        }
    });

    // Function to add a task via POST request
    async function addTask(task) {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task }), // Send task as JSON
        });
        if (!response.ok) {
            throw new Error('Failed to add task'); // Throw error if response is not OK
        }
    }

    loadTasks(); // Load tasks initially when the page is loaded
});