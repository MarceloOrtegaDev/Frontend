import { deleteTask, putTask } from "./controllers.js";

export const renderTask = (task) => {
  const $taskContainer = document.createElement("div");
  $taskContainer.classList.add("task-item", "border", "border-solid", "border-black", "rounded", "p-3", "h-auto");

  const taskTitle = document.createElement("p");
  const $taskDescription = document.createElement("p");
  const $taskIsCompleted = document.createElement("input");
  const $taskDelete = document.createElement("button");
  const $taskEdit = document.createElement("button");

  taskTitle.classList.add("task-title", "font-bold", "text-red-900", "mb-1");
  taskTitle.textContent = task.title;

  if (task.isComplete) {
    taskTitle.style.textDecoration = "line-through";
  }

  $taskContainer.appendChild(taskTitle);

  $taskDescription.classList.add("task-description", "font-semibold", "pb-1", "truncate");
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
    $taskDescription.style.textDecoration = task.isComplete ? "line-through" : "none";

    putTask(task.id, {
      title: task.title,
      description: task.description,
      isComplete: task.isComplete,
    }).catch((error) => console.error("Error al actualizar la tarea:", error));
  });

  $taskContainer.appendChild($taskIsCompleted);

  $taskDelete.classList.add("ml-2", "border", "border-solid", "border-black", "p-1", "rounded", "bg-blue-950", "text-white", "font-semibold", "h-10");
  $taskDelete.textContent = "Delete";

  $taskDelete.addEventListener("click", () => {
    deleteTask(task.id)
      .then(() => {
        $taskContainer.remove();
      })
      .catch((error) => console.error("Error al eliminar la tarea:", error));
  });

  $taskContainer.appendChild($taskDelete);

  // Botón de editar
  $taskEdit.classList.add("ml-2", "border", "border-solid", "border-black", "p-1", "rounded", "bg-red-700", "text-white", "font-semibold", "h-10", "w-16");
  $taskEdit.textContent = "Editar";

  $taskEdit.addEventListener("click", () => {
    const $editModal = document.getElementById("edit-modal");
    const $editTitle = document.getElementById("edit-title");
    const $editDescription = document.getElementById("edit-description");
    const $editCheckbox = document.getElementById("edit-checkbox");

    // Rellenar los campos del modal con los datos actuales de la tarea
    $editTitle.value = task.title;
    $editDescription.value = task.description;
    $editCheckbox.checked = task.isComplete;

    // Mostrar el modal
    $editModal.classList.remove("hidden");

    // Manejador del formulario de edición
    const $editForm = document.getElementById("edit-form");
    $editForm.onsubmit = (event) => {
      event.preventDefault();

      putTask(task.id, {
        title: $editTitle.value.trim(),
        description: $editDescription.value.trim(),
        isComplete: $editCheckbox.checked,
      })
        .then(() => {
          // Actualiza los elementos de la tarea en la interfaz
          taskTitle.textContent = $editTitle.value;
          $taskDescription.textContent = $editDescription.value;
          task.isComplete = $editCheckbox.checked;
          taskTitle.style.textDecoration = task.isComplete ? "line-through" : "none";
          $taskDescription.style.textDecoration = task.isComplete ? "line-through" : "none";

          // Cerrar el modal
          $editModal.classList.add("hidden");
        })
        .catch((error) => console.error("Error al actualizar la tarea:", error));
    };

    // Cerrar el modal al hacer clic en "Cancelar"
    document.getElementById("close-modal").addEventListener("click", () => {
      $editModal.classList.add("hidden");
    });
  });

  $taskContainer.appendChild($taskEdit);

  return $taskContainer;
};
