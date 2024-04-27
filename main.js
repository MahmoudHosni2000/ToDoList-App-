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
// Block 2: Initialization and Event Listeners
window.onload = function () {
  theInput.focus();
};

theAddButton.addEventListener("click", handler);
input.addEventListener("keypress", handler);

// Block 3: Adding The Task
function handler(event) {
  if (
    event.type === "click" ||
    (event.type === "keypress" && event.key === "Enter")
  ) {
    addCards();
  }
}
// Block 4: Task Addition Logic

function addCards() {
  if (theInput.value.trim() === "") {
    swal("Oops...", "Something went wrong!", "error");
  } else {
    let noTasksMsg = document.querySelector(".no-tasks-message");

    if (document.body.contains(noTasksMsg)) {
      noTasksMsg.remove();
    }

    // Check if array includes an existed value :
    let taskExists = tasksArray.includes(theInput.value.trim());

    // Store the entered values ​​in an array
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
      tasksContainer.appendChild(mainSpan);

      updateButtonsVisibility(); // Call this function to update buttons visibility
    } else {
      theInput.value = "";
      swal({
        title: "Oops...",
        text: "Task already exists !",
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
    tasksArray.pop();
    // Check Number Of Tasks Inside The Container
    if (tasksArray == "") {
      createNoTasks();
      buttonsDiv.remove();
    }
  }

  // Function To Create No Tasks Message
  function createNoTasks() {
    // Create Message Span Element
    let msgSpan = document.createElement("span");

    // Create The Text Message
    let msgText = document.createTextNode("No Tasks To Show");

    // Add Text To Message Span Element
    msgSpan.appendChild(msgText);

    // Add Class To Message Span
    msgSpan.className = "no-tasks-message";

    // Append The Message Span Element To The Task Container
    tasksContainer.appendChild(msgSpan);
  }

  // Finish Task
  if (e.target.classList.contains("task-box")) {
    // Toggle Class 'finished'
    e.target.classList.toggle("finished");
  }

  // Calculate Tasks
  calculateTasks();
});
// Block 6: Function To Calculate Tasks

// Function To Calculate Tasks
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
  } else {
    // Append the main container div to the tasks-content div
    tasksContainer.appendChild(buttonsDiv);
  }
}

document.addEventListener("click", function (e) {
  // Delete Task
  if (e.target.className == "Delete") {
    while (tasksContainer.firstChild) {
      tasksContainer.removeChild(tasksContainer.firstChild);
    }
    // Clear the tasksArray
    tasksArray = [];
    calculateTasks();
      // Function To Create No Tasks Message
  function createNoTasks() {
    // Create Message Span Element
    let msgSpan = document.createElement("span");

    // Create The Text Message
    let msgText = document.createTextNode("No Tasks To Show");

    // Add Text To Message Span Element
    msgSpan.appendChild(msgText);

    // Add Class To Message Span
    msgSpan.className = "no-tasks-message";

    // Append The Message Span Element To The Task Container
    tasksContainer.appendChild(msgSpan);
  }
  createNoTasks();
  }
});

// Block 8: Bulk Operations - Delete All Tasks

document.addEventListener("click", function (e) {
  // Finish Task
  if (e.target.className == "Finish") {
    const taskBoxElements = document.querySelectorAll(".task-box");
    const allHaveFinished = Array.from(taskBoxElements).every((element) =>
      element.classList.contains("finished")
    );
    // Block 9: Bulk Operations - Finish All Tasks

    taskBoxElements.forEach((element) => {
      if (allHaveFinished) {
        element.classList.remove("finished");
      } else {
        element.classList.add("finished");
      }
    });
  }
});
