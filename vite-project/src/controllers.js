import { miApi } from "./fetchApi.js";

// Crear una nueva tarea
export const postTasks = ({ title, description, isComplete }) => {
  return miApi("", {
    method: "POST",
    body: JSON.stringify({ title, description, isComplete }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Obtener todas las tareas
export const getAllTasks = () => {
  return miApi();
};

// Eliminar una tarea
export const deleteTask = (id) => {
  if (!id) {
    console.error("El ID es necesario para eliminar la tarea");
    return;
  }
  return miApi(`/${id}`, {
    method: "DELETE",
  });
};

// Actualizar una tarea
export const putTask = (id, { title, description, isComplete }) => {
  if (!id) {
    console.error("El ID es necesario para actualizar la tarea");
    return;
  }
  return miApi(`/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      description,
      isComplete,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
