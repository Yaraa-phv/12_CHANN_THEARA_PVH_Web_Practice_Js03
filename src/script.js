let taskArray = []; 
document.querySelector("#submitForm").addEventListener("submit", (e) => {
  e.preventDefault(); 

  const taskInputEL = document.querySelector("#task-input").value.trim();
  const datePickerEL = document.querySelector("#datepicker-actions").value;
  const priorityPickingEL = document.querySelector("#prio-picking").value;
  const taskListEL = document.querySelector("#taskList");


  const errorMessage = document.querySelector("#errorMsg");
  errorMessage.innerText = "";

  if (taskInputEL === "" || datePickerEL === "" || priorityPickingEL === "Select Priority") {
    errorMessage.innerText = "Please fill the information here!!!";
    return;
  }else{
  const row = document.createElement("tr");
  row.classList.add("bg-white", "border-b", "dark:bg-gray-800", "dark:border-gray-700", "border-gray-200", "dark:text-black");

  row.innerHTML = `
        <td class="px-6 py-4 font-medium text-black-900 whitespace-nowrap dark:text-black">${taskInputEL}</td>
        <td class="px-6 py-4">${datePickerEL}</td>
        <td class="px-6 py-4">${priorityPickingEL}</td>
        <td class="px-6 py-4">
            <button class="bg-orange-700 p-2 rounded-lg text-white status-btn">Pending</button>
        </td>
    `;

  taskListEL.appendChild(row);
}
  document.querySelector("#submitForm").reset();
});

function toggleStatus(index) {
  taskArray[index].status = taskArray[index].status === "Pending" ? "Completed" : "Pending";
  row();
}

function deleteTask(index) {
  taskArray.splice(index, 1);
  row()};
