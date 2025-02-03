document.addEventListener('DOMContentLoaded', () => {
    const todoinput = document.getElementById("todoinput");
    const addtaskbutton = document.getElementById("add-task-button");
    const todolist = document.getElementById("todo-list");
    const subheading = document.getElementById("subheading");  // New subheading element

    // Fetch tasks from localStorage, or start with an empty array if none exist
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks from localStorage
    tasks.forEach(task => renderTask(task));

    // Add task event for Add Task button
    addtaskbutton.addEventListener('click', () => {
        addTask();
    });

    // Add task event for Enter key press
    todoinput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission or page reload
            addTask(); // Call addTask function
        }
    });

    // Function to add a task
    function addTask() {
        const taskText = todoinput.value.trim();
        if (taskText === "") return; // Prevent adding empty tasks

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoinput.value = "";

        // Hide the subheading once a task is added
        if (tasks.length > 0) {
            subheading.style.display = "none";
        }
    }

    // Render task on the screen
    function renderTask(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <span class="cont">
            <button class="editbtn">Edit</button>
            <button class="deletebtn">Delete</button></span>
        `;
        todolist.appendChild(li);

        // Edit button functionality
        li.querySelector('.editbtn').addEventListener('click', () => {
            const taskTextElement = li.querySelector('.task-text');
            const newText = prompt("Edit task:", taskTextElement.textContent);
            if (newText !== null && newText.trim() !== "") {
                taskTextElement.textContent = newText;
                task.text = newText; // Update task text in the tasks array
                saveTasks();
            }
        });

        // Delete button functionality
        li.querySelector('.deletebtn').addEventListener('click', () => {
            li.remove();  // Remove task from DOM
            tasks = tasks.filter(t => t.id !== task.id);  // Remove task from tasks array
            saveTasks();
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }
  
