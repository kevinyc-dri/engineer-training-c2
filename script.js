console.log("Engineering Training C2");
const modalButton = document.getElementById("modalButton");
const modalContainer = document.getElementById("modalContainer");
const closeModalButton = document.getElementsByClassName("close-modal-button");
console.log("closeModalButton", closeModalButton);

console.log("modalButton", modalButton);

modalButton.addEventListener("click", function () {
  console.log("clicked button!");
  modalContainer.classList.toggle("hidden");
});

closeModalButton[0].addEventListener("click", function () {
  console.log("clicked close modal button!");
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.classList.toggle("hidden");
});

jiraLinks = [
  "https://totalwine.atlassian.net/browse/TT-2",
  "https://totalwine.atlassian.net/browse/TT-16",
  "https://totalwine.atlassian.net/browse/TT-17",
  "https://totalwine.atlassian.net/browse/TT-18",
  "https://totalwine.atlassian.net/browse/TT-19",
];

jiraTitles = [
  "Create a public repository under your GitHub account",
  "Create a new script file, and import it into index.html and add a console log",
  "JavaScript: Variables",
  "JavaScript: Event Listeners - Add Toggle Button Inside of Modal",
  "JavaScript: Functions - Write a function to toggle hidden class on modal",
];

console.log("jiraTitles", jiraTitles);
console.log("jiraLinks", jiraLinks);
