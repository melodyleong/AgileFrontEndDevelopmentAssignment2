const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b/652e334254105e766fc35326";
const BIN_ID = "652e334254105e766fc35326";
const MASTER_KEY = "$2a$10$Br86WTniKrGfboN4XQUd6uMmPGwTBJkCoz2s2rz0.xptdDUqYoVdy";

let wishlistItems = [];
let editingIndex = null;

// Function to load tasks from JSON Bin
async function loadTasks() {
  try {
    // Fetch the data from JSON Bin
    const response = await axios.get(`${BASE_JSON_BIN_URL}/${BIN_ID}/latest`, {
      headers: { "X-Master-Key": MASTER_KEY }
    });

    // Log the response for debugging
    console.log(response.data);

    // Return the array of tasks
    return response.data.record || []; // Ensure it defaults to an empty array if 'record' is undefined
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
}

// Function to save tasks to JSON Bin
async function saveTasks(todos) {
  try {
    // Save tasks with 'record' key if required by JSON Bin
    const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID}`, { record: todos }, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
}

// Add a new task
function addTodo(todos, name, urgency) {
  todos.push({
    id: Date.now(), // Unique ID
    name: name,
    urgency: urgency
  });
}

// Modify an existing task
function modifyTask(todos, id, newTaskName, newUrgency) {
  const task = todos.find(task => task.id === id);
  if (task) {
    task.name = newTaskName;
    task.urgency = newUrgency;
  }
}

// Delete a task
function deleteTask(todos, id) {
  const index = todos.findIndex(task => task.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
  }
}
