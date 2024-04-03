// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

// Function to load tasks from local storage
function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.innerHTML +=
      ' <button onclick="editTask(this)">Edit</button> <button onclick="deleteTask(this)">Delete</button>';
    taskList.appendChild(li);
  });
}

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (task !== "") {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    loadTasks();
  }
}

// Function to edit a task
function editTask(element) {
  const newTask = prompt("Enter the new task:");
  if (newTask !== null) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const index = Array.from(element.parentNode.parentNode.children).indexOf(
      element.parentNode
    );
    tasks[index] = newTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

// Function to delete a task
function deleteTask(element) {
  if (confirm("Are you sure you want to delete this task?")) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const index = Array.from(element.parentNode.parentNode.children).indexOf(
      element.parentNode
    );
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}
