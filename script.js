console.log("Engineering Training C2")
const modalButton = document.getElementById('modalButton')
const modalContainer = document.getElementById('modalContainer')
const closeModalButton = document.getElementsByClassName('close-modal-button', console.log("closeModalButton"))

console.log('modalButton', modalButton)

modalButton.addEventListener('click', function(){
    console.log("clicked button!")
    modalContainer.classList.toggle('hidden')
});

