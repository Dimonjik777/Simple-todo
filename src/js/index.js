// Declare variables

// Take tasks from local storage or empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Take DOM elements
let tasksContainer = document.querySelector(".tasks");
let taskInput = document.getElementById("taskInput");
let totalTasks = document.querySelector(".tasks__total");
let tasksComplete = document.querySelector(".tasks__complete");
let tasksNoComplete = document.querySelector(".tasks__nocomplete");

// State variables
let isCompleteTasks = false;
let noCompleteTasks = false;

// Counters
let countCompleteTasks = tasks.filter(task => task.isComplete).length;
let countNoCompleteTasks = 0;

render();

document.addEventListener("keydown", event => {

  if (event.key == "Enter" && taskInput.value != "") {

    createTask(taskInput.value);
    taskInput.value = "";
  }
});

document.addEventListener("click", event => {

  // Check click to complete button
  if (event.target.classList.contains("no_complete")) {

    // Get id from button
    let idTask = event.target.getAttribute("id");

    // Find parent on this button
    let parent = event.target.parentElement;
    checkedTask(idTask);


    //Check button and text and stylizing
    if (tasks[idTask].isComplete) {
      event.target.classList.add("complete");
      parent.querySelector("p").classList.add("complete_task");
    }
    else {
      event.target.classList.remove("complete");
      parent.querySelector("p").classList.remove("complete_task");
    }
  }

  // Check click to delete button
  if (event.target.classList.contains("delete")) {

    // Get id from button
    let idTask = event.target.getAttribute("id");
    console.log(idTask);
    deleteTask(idTask);

  }

  // Check click to tasks complete
  if (event.target.classList.contains("tasks__complete")) {
    showCompleteTasks();
  }

  // Check click to tasks no complete
  if(event.target.classList.contains("tasks__nocomplete")){
    showNoCompleteTasks();
  }

});

function render() {

  // Total no complete tasks
  countNoCompleteTasks = tasks.length - countCompleteTasks;

  tasksContainer.innerHTML = "";

  // Render only complete tasks
  if (isCompleteTasks) {

    for (let i = 0; i < tasks.length; i++) {

      if (tasks[i].isComplete) {

        renderHTML(i);
      }

    }
  }

  // Render no complete tasks
  else if(noCompleteTasks){
    
    for (let i = 0; i < tasks.length; i++) {

      if(!tasks[i].isComplete){

        renderHTML(i);

      }

      
    }

  }

  // Render all tasks
  else{

    for (let i = 0; i < tasks.length; i++) {

      renderHTML(i);
    }
  }

  //Render count total tasks, complete tasks no complete

  totalTasks.textContent = `Total tasks: ${tasks.length}`;
  tasksComplete.textContent = `Tasks complete: ${countCompleteTasks}`;
  tasksNoComplete.textContent = `Tasks: ${countNoCompleteTasks}`;

}

function renderHTML(i){

  // Create components for HTML
  let completeButton = document.createElement("button");
  let textTask = document.createElement("p");
  let deleteButton = document.createElement("button");
  let taskHTML = document.createElement("div");

  // Add classes
  textTask.classList.add("text__task");
  completeButton.classList.add("no_complete");
  deleteButton.classList.add("delete");
  taskHTML.classList.add("task");

  // Render complete task
  if (tasks[i].isComplete) {
    completeButton.classList.add("complete");
    textTask.classList.add("complete_task");
  }

  // Add attributes
  completeButton.setAttribute("id", i);
  deleteButton.setAttribute("id", i);
  taskHTML.setAttribute("task-id", i);

  // Add content
  textTask.textContent = tasks[i].task;

  // Add in parent container
  taskHTML.append(completeButton);
  taskHTML.append(textTask);
  taskHTML.append(deleteButton);
  tasksContainer.append(taskHTML);

}


function createTask(task) {
  tasks.unshift({ task: task, isComplete: false });
  
  // Save task in local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(JSON.parse(localStorage.getItem("tasks")));
  render();
}

function deleteTask(id) {

  // Remove task in local storage
  tasks.splice(id, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}

function checkedTask(id) {

  tasks[id].isComplete = !tasks[id].isComplete;

  if(tasks[id].isComplete){
    countCompleteTasks++;
  }
  else{
    countCompleteTasks--;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}

function showCompleteTasks() {
  if(noCompleteTasks){
    noCompleteTasks = !noCompleteTasks;
  }
  isCompleteTasks = !isCompleteTasks;
  render();
}

function showNoCompleteTasks() {
  
  if(isCompleteTasks){
    isCompleteTasks = !isCompleteTasks;
  }
  noCompleteTasks = !noCompleteTasks;
  render();
}