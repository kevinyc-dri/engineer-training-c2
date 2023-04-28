console.log("Engineering Training C2");

const modalButton = document.getElementById("modalButton"); // # w/querySelector
const modalContainer = document.getElementById("modalContainer");
const closeModalButton = document.getElementsByClassName("close-modal-button");
const listElement = document.querySelector('.grid-container') 

console.log("closeModalButton", closeModalButton);

console.log("modalButton", modalButton);

modalButton.addEventListener("click", function () {
  if (dataLoaded) {
    return this.loadData // Friday discussion different ways
  }
  console.log("clicked button!");
  modalContainer.classList.remove("hidden");
  utils.loadData()
});

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

let jirasArray = []


for (let i = 0; i < 5; i++) {
  const jiraObject = ({
    title: jiraTitles[i],
    link: jiraLinks[i]
  })

  jirasArray.push(jiraObject)

}

console.log(jirasArray)

class JiraHandler {
  constructor(titles, links) {
    this.titles = titles;
    this.links = links
  }
} 

const jiraHandler = new JiraHandler(jiraTitles, jiraLinks);


const utils = {
  renderData(){
    return new Promise((resolve) => {
      let response = ''
      jirasArray.forEach(e => {
        const {link, title} = e
        response += 
        `<li>
          <i class="bi bi-check-circle-fill"></i>
          <a href="${link}">${title}</a>;
        </li>`
      })
      resolve(response)
    })
  },
  loadData() {
    const gridContainer = document.querySelector('.grid-container')
    setTimeout(() => {
      this.renderData().then((response) => {
        dataLoaded = true
        gridContainer.innerHTML = response;
        modalContainer.classList.add("hidden");
      })
      console.log("Data loaded")
    }, 1000)
  
  }
}


let dataLoaded = false











// listItem.innerHTML = `<li class="grid-container"><i class="bi bi-check-circle-fill"></i><a href="${e.link}">${e.title}</a>`;
// listElement.prepend(listItem)