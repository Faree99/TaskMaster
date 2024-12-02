
    // Example of dynamic task data (replace with actual fetch from backend)
    const tasks = [
        { id: 1, title: 'Complete Proposal', description: 'Description of Task 1', priority: 'high', deadline: '2024-12-31' },
        { id: 2, title: 'End of the Year Program', description: 'Description of Task 2', priority: 'medium', deadline: '2024-11-30' },
        { id: 3, title: 'Household chores', description: 'Description of Task 2', priority: 'low', deadline: '2024-11-30' },
        { id: 4, title: 'Shopping', description: 'Description of Task 2', priority: 'medium', deadline: '2024-11-30' },
        { id: 5, title: 'Submit Proposal', description: 'Description of Task 2', priority: 'high', deadline: '2024-11-30' },
        { id: 6, title: 'Online Classes', description: 'Description of Task 2', priority: 'medium', deadline: '2024-11-30' },
        { id: 7, title: 'Dricing lesson', description: 'Description of Task 2', priority: 'low', deadline: '2024-11-30' },
        { id: 8, title: 'Attend Seminar', description: 'Description of Task 2', priority: 'medium', deadline: '2024-11-30' },
        { id: 9, title: 'Complete Project', description: 'Description of Task 2', priority: 'high', deadline: '2024-11-30' },
        
        // More tasks can be added here
    ];

    const taskTableBody = document.getElementById('taskTableBody');
    const createTaskBtn = document.getElementById('createTaskBtn');
    const createTaskModal = document.getElementById('createTaskModal');
    const closeCreateModal = document.getElementById('closeCreateModal');
    const createTaskForm = document.getElementById('createTaskForm');
    const editTaskModal = document.getElementById('editTaskModal');
    const closeEditModal = document.getElementById('closeEditModal');
    const deleteTaskModal = document.getElementById('deleteTaskModal');
    const closeDeleteModal = document.getElementById('closeDeleteModal');
    const confirmDeleteTask = document.getElementById('confirmDeleteTask');

    // Render tasks in table
    function renderTasks() {
        taskTableBody.innerHTML = ''; // Clear table body
        tasks.forEach(task => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2 border-b">${task.title}</td>
                <td class="px-4 py-2 border-b">${task.priority}</td>
                <td class="px-4 py-2 border-b">${task.deadline}</td>
                <td class="px-4 py-2 border-b">
                    <button onclick="editTask(${task.id})" class="text-yellow-500">Edit</button>
                    <button onclick="deleteTask(${task.id})" class="ml-2 text-red-500">Delete</button>
                </td>
            `;
            taskTableBody.appendChild(row);
        });
    }

    // Open Create Task Modal
    createTaskBtn.addEventListener('click', () => {
        createTaskModal.classList.remove('hidden');
    });

    // Close Create Task Modal
    closeCreateModal.addEventListener('click', () => {
        createTaskModal.classList.add('hidden');
    });

    // Handle Create Task Form Submission
    createTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const priority = document.getElementById('taskPriority').value;
        const deadline = document.getElementById('taskDeadline').value;

        const newTask = {
            id: tasks.length + 1,
            title,
            description,
            priority,
            deadline
        };

        tasks.push(newTask);
        renderTasks();
        createTaskModal.classList.add('hidden');
    });

    // Edit Task
    function editTask(taskId) {
        const task = tasks.find(t => t.id === taskId);
        document.getElementById('editTaskId').value = task.id;
        document.getElementById('editTaskTitle').value = task.title;
        document.getElementById('editTaskDescription').value = task.description;
        document.getElementById('editTaskPriority').value = task.priority;
        document.getElementById('editTaskDeadline').value = task.deadline;
        editTaskModal.classList.remove('hidden');
    }

    // Close Edit Task Modal
    closeEditModal.addEventListener('click', () => {
        editTaskModal.classList.add('hidden');
    });

    // Handle Edit Task Form Submission
    document.getElementById('editTaskForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const taskId = document.getElementById('editTaskId').value;
        const title = document.getElementById('editTaskTitle').value;
        const description = document.getElementById('editTaskDescription').value;
        const priority = document.getElementById('editTaskPriority').value;
        const deadline = document.getElementById('editTaskDeadline').value;

        const taskIndex = tasks.findIndex(t => t.id == taskId);
        tasks[taskIndex] = { id: taskId, title, description, priority, deadline };
        renderTasks();
        editTaskModal.classList.add('hidden');
    });

    // Open Delete Task Modal
    function deleteTask(taskId) {
        confirmDeleteTask.onclick = () => {
            tasks.splice(tasks.findIndex(t => t.id === taskId), 1);
            renderTasks();
            deleteTaskModal.classList.add('hidden');
        };
        deleteTaskModal.classList.remove('hidden');
    }

    // Close Delete Task Modal
    closeDeleteModal.addEventListener('click', () => {
        deleteTaskModal.classList.add('hidden');
    });

    // Initial Render
    renderTasks();

    document.addEventListener('DOMContentLoaded', () => {
  const filterBtn = document.getElementById('filterBtn');
  const filterModal = document.getElementById('filterModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const applyFiltersBtn = document.getElementById('applyFiltersBtn');
  
  const priorityFilter = document.getElementById('priorityFilter');
  const dueDateFilter = document.getElementById('dueDateFilter');
  const tasks = document.querySelectorAll('.task-card');

  // Open the modal when the filter button is clicked
  filterBtn.addEventListener('click', () => {
    filterModal.classList.remove('hidden');
  });

  // Close the modal when the close button is clicked
  closeModalBtn.addEventListener('click', () => {
    filterModal.classList.add('hidden');
  });

  // Apply the selected filters
  applyFiltersBtn.addEventListener('click', () => {
    const selectedPriority = priorityFilter.value;
    const selectedDueDate = dueDateFilter.value;

    tasks.forEach(task => {
      const taskPriority = task.dataset.priority;
      const taskDueDate = task.dataset.dueDate;

      // Filter by priority
      const priorityMatch = selectedPriority === 'all' || taskPriority === selectedPriority;

      // Filter by due date
      const dueDateMatch = !selectedDueDate || taskDueDate === selectedDueDate;

      if (priorityMatch && dueDateMatch) {
        task.style.display = 'block';  // Show the task
      } else {
        task.style.display = 'none';   // Hide the task
      }
    });

    filterModal.classList.add('hidden'); // Close the modal after applying filters
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const tasks = document.querySelectorAll('.task-card');
  const searchBar = document.querySelector('.search-bar');
  const priorityFilter = document.querySelector('.priority-filter');
  const dueDateFilter = document.querySelector('.due-date-filter');

  // Search functionality
  searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    tasks.forEach(task => {
      const title = task.querySelector('.task-title').textContent.toLowerCase();
      const description = task.querySelector('.task-status').textContent.toLowerCase();
      if (title.includes(query) || description.includes(query)) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  });

  // Filtering functionality
  priorityFilter.addEventListener('change', () => {
    const selectedPriority = priorityFilter.value;
    tasks.forEach(task => {
      const taskPriority = task.dataset.priority;
      if (selectedPriority === 'all' || taskPriority === selectedPriority) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  });

  dueDateFilter.addEventListener('input', () => {
    const selectedDate = dueDateFilter.value;
    tasks.forEach(task => {
      const taskDate = task.dataset.dueDate;
      if (!selectedDate || taskDate === selectedDate) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  });

  // Change task status functionality
  const changeStatusButtons = document.querySelectorAll('.change-status');
  changeStatusButtons.forEach(button => {
    button.addEventListener('click', () => {
      const taskCard = button.closest('.task-card');
      const currentStatus = taskCard.querySelector('.task-status').textContent;

      if (currentStatus.includes('To Do')) {
        taskCard.querySelector('.task-status').textContent = 'Status: In Progress';
      } else if (currentStatus.includes('In Progress')) {
        taskCard.querySelector('.task-status').textContent = 'Status: Completed';
      } else {
        taskCard.querySelector('.task-status').textContent = 'Status: To Do';
      }
    });
  });
});
