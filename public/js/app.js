const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messsageOne = document.querySelector('#message-1')
const messsageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messsageOne.textContent = 'Loading...'
    messsageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then(data => {
            if (data.error) {
                // return console.log(data.error)
                return messsageOne.textContent = data.error
            }
            messsageOne.textContent = data.location
            // console.log(data.location)
            // console.log(data.forecast)
            messsageTwo.textContent = data.forecast
        })
    })

})