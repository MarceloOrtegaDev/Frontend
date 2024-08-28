const url = "http://localhost:3000/api/tasks";

export const miApi = async (endpoint = "", options = {}) => {
  try {
    const response = await fetch(`${url}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("No hay nada wey:", error.message);
  }
};
