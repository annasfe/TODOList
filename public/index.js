//Select variables

const addBtn = document.querySelector(".add-btn");
const input = document.querySelector(".input");
const ul = document.querySelector(".tasks-list");

//Functions

fetch("http://localhost:3000/tasks", { method: "GET" })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    loadTasksFromServer(data);
  });

function loadTasksFromServer(tasks) {
  tasks.forEach((task) => {
    createTaskElement(task.description, task.checked, task.id);
  });
}

function addItem(e) {
  e.preventDefault(); //Prevent form from submiting
  const text = input.value;

  if (text === undefined || text === "") return;

  fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description: text }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      createTaskElement(text, false, data);
    });

  input.value = "";
}

// Event Listener
addBtn.addEventListener("click", addItem);

function createTaskElement(value, checked, id) {
  const taskDiv = document.createElement("div");
  const buttons = document.createElement("div");

  taskDiv.classList.add("task");

  const listItem = document.createElement("li");
  const textBox = document.createElement("p");

  const checkBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  textBox.innerText = value;
  listItem.classList.add("list-item");
  buttons.classList.add("buttons");
  checkBtn.classList.add("check-btn");

  const checkIcon = document.createElement("i");
  const deleteIcon = document.createElement("i");

  checkIcon.classList.add("fa-solid");
  checkIcon.classList.add("fa-square-check");
  deleteIcon.classList.add("fa-solid");
  deleteIcon.classList.add("fa-trash-can");
  deleteBtn.classList.add("delete-btn");
  if (checked) {
    textBox.classList.add("check-list");
  }

  checkBtn.appendChild(checkIcon);
  deleteBtn.appendChild(deleteIcon);
  buttons.appendChild(checkBtn);
  buttons.appendChild(deleteBtn);
  listItem.appendChild(textBox);
  listItem.appendChild(buttons);
  taskDiv.appendChild(listItem);
  ul.appendChild(taskDiv);

  function checkItem(id) {
    if (textBox.classList.contains("check-list")) {
      textBox.classList.remove("check-list");
      checkBtn.classList.remove("check-list-btn");
    } else {
      fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ checked: true }),
      });

      textBox.classList.add("check-list");
      checkBtn.classList.add("check-list-btn");
    }
  }

  checkBtn.addEventListener("click", () => checkItem(id));

  function deleteItem(e) {
    listItem.remove();
  }
  deleteBtn.addEventListener("click", deleteItem);
}
