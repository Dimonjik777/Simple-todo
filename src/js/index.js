// Declare variables

let tasks = [];
let tasksContainer = document.querySelector(".tasks");
let taskInput = document.getElementById("taskInput");

document.addEventListener("keydown", event => {

  if(event.key == "Enter" && taskInput.value != ""){
    
    createTask(taskInput.value);
    taskInput.value = "";
  }
});

document.addEventListener("click", event => {

  // Check click to complete button
  if(event.target.classList.contains("no_complete")){
    
    // Get id from button
    let idTask = event.target.getAttribute("id");

    // Find parent on this button
    let parent = event.target.parentElement;
    checkedTask(idTask);
    

    //Check button and text and stylizing
    if(tasks[idTask][1]){
      event.target.classList.add("complete");
      parent.querySelector("p").classList.add("complete_task");
    }
    else{
      event.target.classList.remove("complete");
      parent.querySelector("p").classList.remove("complete_task");
    }
  }

  // Check click to delete button
  if(event.target.classList.contains("delete")){
    
     // Get id from button
    let idTask = event.target.getAttribute("id");
    // Find parent on this button
    let parent = event.target.parentElement;

    parent.remove();
    deleteTask(idTask);
    
    console.log(parent);
  }

});

function render() {

  tasksContainer.innerHTML = "";

  for(let i = 0; i < tasks.length; i++){
    
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

    // Add attributes
    completeButton.setAttribute("id", i);
    deleteButton.setAttribute("id", i);
    taskHTML.setAttribute("task-id", i);

    // Add content
    textTask.textContent = tasks[i][0];

    // Add in parent container
    taskHTML.append(completeButton);
    taskHTML.append(textTask);
    taskHTML.append(deleteButton);
    tasksContainer.append(taskHTML);
  }
}

function createTask(task) {
  tasks.unshift([task, false]);
  render();
}

function deleteTask(id) {

  // Delete first element
  if(id == 0)
    tasks.shift();

  // Delete other element
  else
    tasks.splice(id, id);

  render();
}

function checkedTask(id) {

  if (!tasks[id][1]) {
    tasks[id][1] = true;
  }
  else {
    tasks[id][1] = false;
  }
}
