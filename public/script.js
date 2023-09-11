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
    modalButton.addEventListener("click", async () => {
      modalContainer.classList.remove("hidden");
      console.log("clicked button!");
      if (dataLoaded) {
        return;
      }
      utils.loadData(() => {
        dataLoaded = true
        resolve()
      })
    });
  })
}

closeModalButton[0].addEventListener("click", function () {
  console.log("clicked close modal button!");
  modalContainer.classList.toggle("hidden");
});

const gridContainer = document.querySelector('.grid-container')

const utils = {
  async renderData() {
    let response = ''
    const result = await fetch('/getJiraTickets');
    const data = await result.json();
    console.log(data);
    
    return new Promise((resolve) => {
      data.jirasObject.forEach(e => {
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
  }
}

let dataLoaded = false

console.log("BEFORE initModalButton is called");
await initModalButton()
console.log("AFTER initModalButton is called");
})()



