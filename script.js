// Retrieve stored tasks or initialize empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM Elements
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const filterStatus = document.getElementById('filter-status');
const filterCategory = document.getElementById('filter-category');

// Save tasks to LocalStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Automatically update status to 'Overdue' if past deadline
function checkOverdue(task) {
  const today = new Date().toISOString().split('T')[0];
  if (task.status !== 'Completed' && task.deadline < today) {
    task.status = 'Overdue';
  }
}

// Render task list based on active filters
function renderTasks() {
  taskList.innerHTML = '';

  const selectedStatus = filterStatus ? filterStatus.value : 'All';
  const selectedCategory = filterCategory ? filterCategory.value : 'All';

  tasks.forEach((task, index) => {
    // Check deadline status before evaluating filters
    checkOverdue(task);

    // Apply Filter Logic
    const matchesStatus = selectedStatus === 'All' || task.status === selectedStatus;
    const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;

    if (!matchesStatus || !matchesCategory) return;

    // Build Task Item Element
    const li = document.createElement('li');
    li.className = `status-${task.status.replace(/\s+/g, '-').toLowerCase()}`;
    li.innerHTML = `
      <div>
        <strong>${task.name}</strong> 
        <small>[${task.category}]</small><br>
        <small>Due: ${task.deadline}</small>
      </div>
      <div class="actions">
        <select onchange="updateStatus(${index}, this.value)">
          <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
          <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
          <option value="Overdue" ${task.status === 'Overdue' ? 'selected' : ''} disabled>Overdue</option>
        </select>
        <button onclick="deleteTask(${index})" class="delete-btn">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  saveTasks();
}

// Form Submission Event
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTask = {
    name: document.getElementById('task-name').value,
    category: document.getElementById('task-category').value,
    deadline: document.getElementById('task-deadline').value,
    status: document.getElementById('task-status').value
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskForm.reset();
});

// Update Task Status
function updateStatus(index, newStatus) {
  tasks[index].status = newStatus;
  saveTasks();
  renderTasks();
}

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Event Listeners for Filters
filterStatus.addEventListener('change', renderTasks);
filterCategory.addEventListener('change', renderTasks);

// Initial Render on Page Load
renderTasks();