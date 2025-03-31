document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addButton = document.getElementById("add-btn");
    const todoList = document.querySelector(".todo-list");
    const themeToggle = document.getElementById("theme-toggle");
    const clock = document.getElementById("clock");
    const alarmInput = document.getElementById("alarm-time");

    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        clock.textContent = timeString;
    }
    setInterval(updateClock, 1000);
    updateClock();

    function addTask() {
        const taskText = taskInput.value.trim();
        const alarmTime = alarmInput.value;
        if (taskText === "") return;

        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.innerHTML = `
            <span>${taskText}</span>
            <span class="alarm-time">${alarmTime ? new Date(alarmTime).toLocaleString() : ""}</span>
            <button class="delete-btn">&times;</button>
        `;

        todoList.appendChild(li);
        taskInput.value = "";
        alarmInput.value = "";

        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.remove();
        });

        if (alarmTime) {
            scheduleAlarm(taskText, alarmTime);
        }
    }

    function scheduleAlarm(taskText, alarmTime) {
        const alarmDate = new Date(alarmTime);
        const now = new Date();
        const timeToAlarm = alarmDate - now;
        if (timeToAlarm > 0) {
            setTimeout(() => {
                alert(`Time for: ${taskText}`);
            }, timeToAlarm);
        }
    }

    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const icon = themeToggle.querySelector("i");
        icon.classList.toggle("fa-moon");
        icon.classList.toggle("fa-sun");
    });
});
          
