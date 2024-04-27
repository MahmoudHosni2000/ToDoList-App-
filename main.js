/*
  Students Tasks:
  [1] Use Sweet Alert If Input Is Empty
  [2] Check If Task Is Exist
  [3] Create Delete All Tasks Button
  [4] Create Finish All Tasks Button
  [5] Add To Tasks To The Local Storage
*/

// Block 1: Setting Up Variables
// Initialize variables for various elements and flags
// Select elements using querySelector and getElementById
let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let input = document.getElementById("pass");
let buttonsDiv = document.createElement("div");

// Initialize an array to store tasks
let tasksArray = [];

// Function to check and remove "No Tasks to Show" message
function noTaskCheck() {
  let noTasksMsg = document.querySelector(".no-tasks-message");
  if (noTasksMsg && tasksArray.length > 0) {
    noTasksMsg.remove();
  }
}

// Block 2: Initialization and Event Listeners
window.onload = function () {
  // Load tasks from local storage when the page loads
  loadTasksFromLocalStorage();
  theInput.focus();
  noTaskCheck(); // Call noTaskCheck function on page load
  updateButtonsVisibility(); // Call updateButtonsVisibility on page load
};

// Function to call updateButtonsVisibility after any modification to the tasks array
function updateButtons() {
  updateButtonsVisibility();
  noTaskCheck();
}

theAddButton.addEventListener("click", handler);
input.addEventListener("keypress", handler);

// Block 3: Adding The Task
function handler(event) {
  if (
    event.type === "click" ||
    (event.type === "keypress" && event.key === "Enter")
  ) {
    addCards();
    updateButtons(); // Call updateButtons after adding a task
  }
}

// Block 4: Task Addition Logic
function addCards() {
  if (theInput.value.trim() === "") {
    swal("Oops...", "Something went wrong!", "error");
  } else {
    // Check if array includes an existing value
    let taskExists = tasksArray.includes(theInput.value.trim());

    // Store the entered values in an array
    tasksArray.push(theInput.value.trim());

    // if not existed create a new task then append to list
    if (!taskExists) {
      let mainSpan = document.createElement("span");
      let deleteElement = document.createElement("span");
      let text = document.createTextNode(theInput.value);

      let deleteText = document.createTextNode("Delete");

      mainSpan.appendChild(text);
      mainSpan.className = "task-box";

      deleteElement.appendChild(deleteText);
      deleteElement.className = "delete";

      mainSpan.appendChild(deleteElement);

      // Append the new task to the tasks container
      tasksContainer.appendChild(mainSpan);

      // Save tasks to local storage after adding a new task
      saveTasksToLocalStorage();

      // Update buttons visibility after adding the task
      updateButtonsVisibility();
    } else {
      theInput.value = "";
      swal({
        title: "Oops...",
        text: "Task already exists!",
        icon: "warning",
      });
    }

    theInput.value = "";

    // Calculate Tasks
    calculateTasks();
  }
}

// Block 5: Handling Task Deletion and Completion
document.addEventListener("click", function (e) {
  // Delete Task
  if (e.target.className == "delete") {
    // Remove Current Task
    e.target.parentNode.remove();

    // Remove the task from tasksArray
    let taskText = e.target.parentNode.firstChild.textContent;
    tasksArray = tasksArray.filter((task) => task !== taskText);

    // Check if there are no tasks left
    if (tasksArray.length === 0) {
      createNoTasks();
      buttonsDiv.remove();
    }

    saveTasksToLocalStorage();
    updateButtonsVisibility(); // Call updateButtonsVisibility after deleting a task
  }

  // Finish Task
  if (e.target.classList.contains("task-box")) {
    // Toggle Class 'finished'
    e.target.classList.toggle("finished");

    // Save tasks to local storage after completing a task
    saveTasksToLocalStorage();
    updateButtonsVisibility(); // Call updateButtonsVisibility after finishing a task
  }

  // Calculate Tasks
  calculateTasks();
});

// Block 6: Function To Calculate Tasks
function calculateTasks() {
  // Calculate All Tasks
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;

  // Calculate Completed Tasks
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}

// Create the div containing the buttons
buttonsDiv.className = "advance";
buttonsDiv.innerHTML = `
  <button class="Finish">Finish All</button>
  <button class="Delete">Delete All</button>
`;

// Block 7: Update Buttons Visibility
function updateButtonsVisibility() {
  if (tasksArray.length === 0) {
    // If there are no tasks, remove the buttons if they exist
    removeButtons();
  } else {
    // If there are tasks, remove buttons if they exist and append them to the end
    removeButtons();
    tasksContainer.appendChild(buttonsDiv);
  }
}

// Function to append buttons at the end of the tasks container
function appendButtons() {
  if (!tasksContainer.contains(buttonsDiv)) {
    tasksContainer.insertAdjacentElement("beforeend", buttonsDiv);
  }
}

// Function to remove buttons from the tasks container
function removeButtons() {
  if (tasksContainer.contains(buttonsDiv)) {
    buttonsDiv.remove();
  }
}

// Block 8: Deleting All Tasks
document.addEventListener("click", function (e) {
  if (e.target.className == "Delete") {
    while (tasksContainer.firstChild) {
      tasksContainer.removeChild(tasksContainer.firstChild);
    }
    // Clear the tasksArray
    tasksArray = [];
    calculateTasks();
    // Remove buttons
    buttonsDiv.remove();

    // Clear tasks from local storage
    localStorage.removeItem("tasks");

    // Function To Create No Tasks Message
    createNoTasks();
  }
});

// Block 9: Finishing All Tasks
document.addEventListener("click", function (e) {
  if (e.target.className == "Finish") {
    const taskBoxElements = document.querySelectorAll(".task-box");
    const allHaveFinished = Array.from(taskBoxElements).every((element) =>
      element.classList.contains("finished")
    );

    taskBoxElements.forEach((element) => {
      if (allHaveFinished) {
        element.classList.remove("finished");
      } else {
        element.classList.add("finished");
      }
    });

    // Save tasks to local storage after bulk finishing tasks
    saveTasksToLocalStorage();
    updateButtons(); // Call updateButtons after finishing all tasks
  }
});

// Function to create "No Tasks to Show" message
function createNoTasks() {
  let noTasksMsg = document.createElement("span");
  noTasksMsg.textContent = "No Tasks To Show";
  noTasksMsg.className = "no-tasks-message";
  tasksContainer.appendChild(noTasksMsg);
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasksArray = JSON.parse(storedTasks);
    tasksArray.forEach((task) => {
      let mainSpan = document.createElement("span");
      let deleteElement = document.createElement("span");
      let text = document.createTextNode(task);

      let deleteText = document.createTextNode("Delete");

      mainSpan.appendChild(text);
      mainSpan.className = "task-box";

      deleteElement.appendChild(deleteText);
      deleteElement.className = "delete";

      mainSpan.appendChild(deleteElement);
      tasksContainer.appendChild(mainSpan);
    });

    noTaskCheck(); // Call noTaskCheck function after loading tasks
  }
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
