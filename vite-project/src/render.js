import { deleteTask, putTask } from "./controllers.js";

export const renderTask = (task) => {
  const $taskContainer = document.createElement("div");
  $taskContainer.classList.add("task-item");

  const taskTitle = document.createElement("p");
  const $taskDescription = document.createElement("p");
  const $taskIsCompleted = document.createElement("input");
  const $taskDelete = document.createElement("button");

  taskTitle.classList.add("task-title");
  taskTitle.textContent = task.title;

  if (task.isComplete) {
    taskTitle.style.textDecoration = "line-through";
  }

  $taskContainer.appendChild(taskTitle);

  $taskDescription.classList.add("task-description");
  $taskDescription.textContent = task.description;

  if (task.isComplete) {
    $taskDescription.style.textDecoration = "line-through";
  }

  $taskContainer.appendChild($taskDescription);

  $taskIsCompleted.type = "checkbox";
  $taskIsCompleted.checked = task.isComplete;

  $taskIsCompleted.addEventListener("change", (event) => {
    task.isComplete = event.target.checked;
    taskTitle.style.textDecoration = task.isComplete ? "line-through" : "none";
    $taskDescription.style.textDecoration = task.isComplete
      ? "line-through"
      : "none";

    putTask(task.id, {
      title: task.title,
      description: task.description,
      isComplete: task.isComplete,
    }).catch((error) => console.error("Error al actualizar la tarea:", error));
  });

  $taskContainer.appendChild($taskIsCompleted);

  $taskDelete.textContent = "Delete";

  $taskDelete.addEventListener("click", () => {
    deleteTask(task.id)
      .then(() => {
        $taskContainer.remove();
      })
      .catch((error) => console.error("Error al eliminar la tarea:", error));
  });

  $taskContainer.appendChild($taskDelete);

  return $taskContainer;
};
