console.log('Client side js is loaded')

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input') // query dom element by tag
const messageOne = document.querySelector('#message-1') // query dom element by id
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JS' // text will show in browser

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevent the page from refreshing

    const location = search.value // access search from input in dom

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // console.log(location)

    // below already handled in backend API
    // if (!location) {
    //     messageOne.textContent = 'Please enter a location!'
    //     return console.log('Please enter a location')
    // }

    // const query = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)
    const query = 'http://localhost:3000/weather?address=' + location

    // fetch when someone submits form
    fetch(query).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })