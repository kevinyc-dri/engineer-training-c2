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

jirasArray = [];

const jiraTitles = [
  "Create a public repository under your GitHub account",
  "Create a new script file, and import it into index.html and add a console log",
  "JavaScript: Variables",
  "JavaScript: Event Listeners - Add Toggle Button Inside of Modal",
  "JavaScript: Functions - Write a function to toggle hidden class on modal",
];

for (i = 0; i < jiraTitles.length; i++) {
  console.log(jiraTitles[i]);
}

const jiraLinks = [
  "https://totalwine.atlassian.net/browse/TT-2",
  "https://totalwine.atlassian.net/browse/TT-16",
  "https://totalwine.atlassian.net/browse/TT-17",
  "https://totalwine.atlassian.net/browse/TT-18",
  "https://totalwine.atlassian.net/browse/TT-19",
];

for (i = 0; i < jiraLinks.length; i++) {
  console.log(jiraLinks[i]);
}

// console.log("jiraTitles", jiraTitles);
// console.log("jiraLinks", jiraLinks);
