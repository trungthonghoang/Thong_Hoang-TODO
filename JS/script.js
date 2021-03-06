// Constanten
const inputField = document.getElementById("inputField");
const addTaskBtn = document.getElementById("addBtn");
const tasksContainer = document.getElementById("tasksContainer");
const tasksList = document.getElementById("tasksList");

// Functions
const showTasks = async () => {
  const tasks = await getApiData();

  const listItems = tasks.map((task) => {
    const newLi = document.createElement("li");
    newLi.innerHTML = task.description;
    newLi.classList.add("task");
    newLi.setAttribute("id", task.id);

    const removeButton = document.createElement("button");
    removeButton.classList.add("deleteBtn");

    removeButton.addEventListener("click", function () {
      removeDataFromApi(task.id);
      console.log("task id ", task.id);
      document.getElementById(task.id).remove();
    });

    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    removeButton.value = task.id;

    newLi.appendChild(removeButton);
    return newLi;
  });

  listItems.forEach((task) => {
    tasksList.appendChild(task);
  });
};

showTasks();

const addTask = async () => {
  const input = inputField;
  const description = input.value;
  if (description != "") {
    const task = {
      description: description,
      done: false,
    };
    const taskResult = await postDataToApi(task);
    console.log("The task result is:", taskResult);
    input.value = "";
  }
};

// Eventlisteners
addTaskBtn.addEventListener("click", addTask);

addTaskBtn.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
