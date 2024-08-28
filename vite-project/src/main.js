import './style.css'
import { getAllTasks, postTasks } from "./controllers.js";
import { renderTask } from "./render.js";

const $formulario = document.getElementById("formulario");
const $app = document.getElementById("app");

$formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const $title = document.getElementById("input-title");
  const $description = document.getElementById("input-description");
  const $isComplete = document.getElementById("input-checkbox");

  const nuevasTareas = {
    title: $title.value,
    description: $description.value,
    isComplete: $isComplete.checked,
  };

  postTasks(nuevasTareas)
    .then((result) => {
      if (result) {
        // $app.appendChild(renderTask(result));
          getAllTasks()
          .then((tasks) => {
            $app.innerHTML = "";
            tasks.forEach((task) => {
              console.log(task)
              $app.appendChild(renderTask(task));
            });
          })
          .catch((error) => console.error("Error al obtener las tareas:", error));
        event.target.reset();
      }
    })
    .catch((error) => console.error("Error al crear la tarea:", error));
    
    
});

document.addEventListener("DOMContentLoaded", () => {
  getAllTasks()
    .then((tasks) => {
      $app.innerHTML = "";
      tasks.forEach((task) => {
        $app.appendChild(renderTask(task));
      });
    })
    .catch((error) => console.error("Error al obtener las tareas:", error));
});