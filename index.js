//Select variables

const addBtn = document.querySelector(".add-btn");
const input = document.querySelector(".input");
const ul = document.querySelector(".tasks-list");

//Functions

function addItem(e) {
  e.preventDefault(); //Prevent form from submiting
  const text = input.value;

  if (text === undefined || text === "") return;

  const taskDiv = document.createElement("div");
  const buttons = document.createElement("div");

  taskDiv.classList.add("task");

  const listItem = document.createElement("li");
  const textBox = document.createElement("p");

  const checkBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  textBox.innerText = text;
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

  checkBtn.appendChild(checkIcon);
  deleteBtn.appendChild(deleteIcon);
  buttons.appendChild(checkBtn);
  buttons.appendChild(deleteBtn);
  listItem.appendChild(textBox);
  listItem.appendChild(buttons);
  taskDiv.appendChild(listItem);
  ul.appendChild(taskDiv);

  input.value = "";

  function checkItem() {
    if (textBox.classList.contains("check-list")) {
      textBox.classList.remove("check-list");
      checkBtn.classList.remove("check-list-btn");
    } else {
      textBox.classList.add("check-list");
      checkBtn.classList.add("check-list-btn");
    }
  }
  checkBtn.addEventListener("click", checkItem);

  function deleteItem(e) {
    listItem.remove();
  }
  deleteBtn.addEventListener("click", deleteItem);
}
// Event Listener
addBtn.addEventListener("click", addItem);
