(async function() {
console.log("Engineering Training C2");

const modalButton = document.getElementById("modalButton"); // # w/querySelector
const modalContainer = document.getElementById("modalContainer");
const closeModalButton = document.getElementsByClassName("close-modal-button");
const listElement = document.querySelector('.grid-container') 

console.log("closeModalButton", closeModalButton);

console.log("modalButton", modalButton);

function initModalButton() {
  return new Promise((resolve) => {
    modalButton.addEventListener("click", function () {
      if (dataLoaded) {
        return;
      }
      console.log("clicked button!");
      modalContainer.classList.remove("hidden");
      utils.loadData(function() {
        dataLoaded = true
        resolve()
      })
    });
  })
}


closeModalButton[0].addEventListener("click", function () {
  console.log("clicked close modal button!");
});


const jiraTitles = [
  "Create a public repository under your GitHub account",
  "Create a new script file, and import it into index.html and add a console log",
  "JavaScript: Variables",
  "JavaScript: Event Listeners - Add Toggle Button Inside of Modal",
  "JavaScript: Functions - Write a function to toggle hidden class on modal",
];

const jiraLinks = [
  "https://totalwine.atlassian.net/browse/TT-2",
  "https://totalwine.atlassian.net/browse/TT-16",
  "https://totalwine.atlassian.net/browse/TT-17",
  "https://totalwine.atlassian.net/browse/TT-18",
  "https://totalwine.atlassian.net/browse/TT-19",
];

class JiraHandler {
  constructor(links, titles) {
    this.links = links;
    this.titles = titles;
    this.jiraObject = this.createJiraObject();
  }
  createJiraObject(){
    let jirasArray = []; 
    const jiraTemplate = { icon: "bi bi-check-circle-fill" }

    const errorJiraTemplate = { icon: "bi bi-x-circle"}

    function getRandomNumber() {
      return Math.floor(Math.random() * 3);
  }
  

    console.log(jirasArray)
    for (let i = 0; i < this.titles.length; i++) {
      const jiraObject = {
        title: this.titles[i],
        link: this.links[i],
      };
      const useErrorTemplate = getRandomNumber() === 0;
      const template = useErrorTemplate ? errorJiraTemplate : jiraTemplate;
     
      jirasArray.push({...jiraTemplate,...jiraObject,...template})
    }
    return jirasArray
  }
} 

const jiraHandler = new JiraHandler(jiraTitles, jiraLinks);

const utils = {
  renderData(){
    return new Promise((resolve) => {
      let response = ''
      jiraHandler.jiraObject.forEach(e => {
        const {link, title, icon} = e
        response += 
        `<li>
          <i class="${icon}"></i>
          <a href="${link}">${title}</a>;
        </li>`
      })
      resolve(response)
    })
  },
  loadData(callback) {
    const gridContainer = document.querySelector('.grid-container')
    setTimeout(() => {
      this.renderData().then((response) => {
        dataLoaded = true
        gridContainer.innerHTML = response;
        modalContainer.classList.add("hidden");
        if (typeof callback === "function")
        return response
      }),
    console.log("Data loaded")
  }, 1000) 
  callback()
    
  }
}

let dataLoaded = false

console.log("BEFORE initModalButton is called");
await initModalButton()
console.log("AFTER initModalButton is called");
})()



