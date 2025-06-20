// Load tasks from local storage or initialize an empty array

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render the task list

renderTasks();

function renderTasks() {

  const taskList = document.getElementById('taskList');

  taskList.innerHTML = ''; // Clear the list

  tasks.forEach(task => {

    const li = createTaskElement(task);

    taskList.appendChild(li);

  });

}

function createTaskElement(task) {

  const li = document.createElement('li');

  li.className = 'list-group-item d-flex justify-content-between align-items-center';

  li.dataset.id = task.id; // Store task ID for reference

  const div = document.createElement('div');

  div.className = 'form-check';

  const checkbox = document.createElement('input');

  checkbox.type = 'checkbox';

  checkbox.className = 'form-check-input';

  checkbox.id = 'task-' + task.id;

  checkbox.checked = task.completed;

  const label = document.createElement('label');

  label.className = 'form-check-label';

  label.setAttribute('for', 'task-' + task.id);

  label.textContent = task.text;

  div.appendChild(checkbox);

  div.appendChild(label);

  const deleteButton = document.createElement('button');

  deleteButton.className = 'btn btn-danger btn-sm';

  deleteButton.textContent = 'Delete';

  li.appendChild(div);

  li.appendChild(deleteButton);

  return li;

}

// Add task event listener

document.getElementById('addButton').addEventListener('click', function() {

  const taskText = document.getElementById('taskInput').value;

  if (taskText) {

    const task = {

      id: Date.now(), // Unique ID based on timestamp

      text: taskText,

      completed: false

    };

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to local storage

    const li = createTaskElement(task);

    document.getElementById('taskList').appendChild(li);

    document.getElementById('taskInput').value = ''; // Clear input

  }

});

// Event delegation for checkbox changes and delete clicks

document.getElementById('taskList').addEventListener('change', function(event) {

  if (event.target.type === 'checkbox') {

    const li = event.target.closest('li');

    const taskId = li.dataset.id;

    const task = tasks.find(t => t.id == taskId);

    if (task) {

      task.completed = event.target.checked;

      localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks

      // CSS will automatically handle the styling

    }

  }

});

document.getElementById('taskList').addEventListener('click', function(event) {

  if (event.target.classList.contains('btn-danger')) {

    const li = event.target.closest('li');

    const taskId = li.dataset.id;

    tasks = tasks.filter(t => t.id != taskId); // Remove task from array

    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks

    li.remove(); // Remove from DOM

  }

});
