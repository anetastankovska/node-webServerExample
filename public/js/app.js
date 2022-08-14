const { response } = require("express")

console.log('Client side JavaScript file loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
     response.json().then((data) => {
        console.log(data)
     })
})

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'Paragraph 1'

weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault()
    const location = searchElement.value
    console.log(location)
})