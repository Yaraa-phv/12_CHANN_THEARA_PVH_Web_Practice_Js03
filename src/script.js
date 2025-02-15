let taskArray = [];

document.querySelector("#submitForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const taskInputEl = document.querySelector("#task-input").value.trim();
  const datePickerEl = document.querySelector("#datepicker-actions").value;
  const priorityPickingEl = document.querySelector("#prio-picking").value;
  const errorMessage = document.querySelector("#errorMsg");

  errorMessage.innerText = "";

  if (!validateForm(taskInputEl, datePickerEl, priorityPickingEl, errorMessage)) {
      return;
  }

  // ADD NEW TASK
  const newTask = {
    id: Date.now(),
    task: taskInputEl,
    dueDate: formatDate(new Date(datePickerEl)),
    priority: priorityPickingEl,
    status: "Pending"
  };

  // PUST TO ARRAY
  taskArray.push(newTask);

  renderTasks();

  // RESET FORM
  document.querySelector("#submitForm").reset();
});

//VALIDATION FUNCTION
function validateForm(task, date, priority, errorEl) {

  //VALIDATION FOR TASK NAME INPUT
  if (task === "") {
    errorEl.innerText = "Please fill information here!!!";
    return false;
  }

  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  //VALIDATION FOR PAST DATE
  if (selectedDate < today) {
    document.querySelector("#errorMsg2").innerText = "Due date cannot be in the past!!!";
    return false;
  }

  //VALIDATION FOR PRIORITY SELECTING
  if(priority === "Select Priority"){
    document.querySelector("#errorMsg3").innerText = "Please select one of priority!!!"
    return false;
  }
  return true;
}

// DATE FORMAT FUNCTION : MM/DD/YYYY
function formatDate(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

// SET COLORS TO PRIORITY
function getPriorityColor(priority) {
  const colors = {
    'High': 'text-red-600',
    'Medium': 'text-yellow-600',
    'Low': 'text-green-600'
  };
  return colors[priority] || '';
}

// GET COLORS FOR STATUS
function getStatusColor(status) {
  return status === 'Pending' ? 'bg-yellow-500' : 'bg-green-500';
}

// TOGGLE TASK STATUS
function toggleStatus(id) {
  const task = taskArray.find(t => t.id === id);
  if (task) {
    task.status = task.status === "Pending" ? "Completed" : "Pending";
    renderTasks();
  }
}

function renderTasks() {
  const taskListEl = document.querySelector("#taskList");
  taskListEl.innerHTML = '';

  for (let i = 0; i < taskArray.length; i++) {
    const task = taskArray[i];
    const row = document.createElement("tr");
    row.classList.add("bg-white", "border-b", "dark:bg-gray-800", "dark:border-gray-700", "transition-all", "duration-300");
    
    row.innerHTML = `
        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${task.task}</td>
        <td class="px-6 py-4">${task.dueDate}</td>
        <td class="px-6 py-4 ${getPriorityColor(task.priority)}">${task.priority}</td>
        <td class="px-6 py-4">
            <button onclick="toggleStatus(${task.id})" 
                    class="transition-colors duration-300 ${getStatusColor(task.status)} p-2 rounded-lg text-white hover:opacity-90">
                ${task.status}
            </button>
        </td>
    `;
    
    taskListEl.appendChild(row);
}
}