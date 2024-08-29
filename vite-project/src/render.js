import { deleteTask, putTask } from "./controllers.js";

export const renderTask = (task) => {
  const $taskContainer = document.createElement("div");
  $taskContainer.classList.add("task-item", "border", "border-solid", "border-black", "rounded", "p-3", "h-auto");

  const taskTitle = document.createElement("p");
  const $taskDescription = document.createElement("p");
  const $taskIsCompleted = document.createElement("input");
  const $taskDelete = document.createElement("button");

  $taskDelete.classList.add("ml-2", "border", "border-solid", "border-black", "border-solid", "p-1", "rounded", "bg-blue-950", "text-white", "font-semibold", "h-10")

  taskTitle.classList.add("task-title", "font-bold", "text-red-900", "mb-1");
  taskTitle.textContent = task.title;

  if (task.isComplete) {
    taskTitle.style.textDecoration = "line-through";
  }

  $taskContainer.appendChild(taskTitle);

  $taskDescription.classList.add("task-description", "font-semibold", "pb-1");
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
