console.log("Engineering Training C2")
const modalButton = document.getElementById('modalButton')
const modalContainer = document.getElementById('modalContainer')
const closeModalButton = document.getElementsByClassName('close-modal-button')[0]
console.log('closeModalButton', closeModalButton)

console.log('modalButton', modalButton)

modalButton.addEventListener('click', function(){
    console.log("clicked button!")
    modalContainer.classList.toggle('hidden')
});

closeModalButton.addEventListener('click', function(){
    console.log('clicked close modal button!')
    const modalContainer = document.getElementById('modalContainer')
    modalContainer.classList.toggle('hidden')
})