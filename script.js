const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false,
    };
    allTodos.push(todoObject);
    // createTodoItem(todoText);
    updateTodoList();
    saveTodos();
    todoInput.value = "";
  }
}

function updateTodoList() {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoindex) => {
    todoItem = createTodoItem(todo, todoindex);
    todoListUL.append(todoItem);
  });
}

function createTodoItem(todo, todoindex) {
  const todoId = "todo-" + todoindex;
  const todoLI = document.createElement("li");
  const todoText = todo.text;
  // todoLI.innerText = todo;
  todoLI.className = "todo";
  todoLI.innerHTML = ` <input type="checkbox" id="${todoId}" />
          <label class="custom-checkbox" for="${todoId}"
            ><img
              fill="transparent"
              src="/icons/check_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
              alt="check"
          /></label>
          <label for="${todoId}" class="todo-text">
            ${todoText}
          </label>
          <button class="delete-button">
            <img
              fill="var(--secondary-color)"
              src="/icons/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
              alt="delete"
              class="icon"
            />
          </button>`;
  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoindex);
  });
  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[todoindex].completed = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = todo.completed;
  return todoLI;
}

function deleteTodoItem(todoindex) {
  allTodos = allTodos.filter((_, i) => i !== todoindex);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  const todosJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJson);
}

function getTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}
