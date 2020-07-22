const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorParagraph = document.querySelector('.error')
const successParagraph = document.querySelector('.forecast')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    successParagraph.textContent = "Loading..."
    fetch(`http://localhost:3000/weather?address=${encodeURI(location)}`).then((response) => {
    response.json().then((data) => {
            if(data.error){
                errorParagraph.textContent = data.error
                successParagraph.textContent = ''
                
            } else {
                errorParagraph.textContent = ''
                successParagraph.innerHTML = data.location + '<br>'
                successParagraph.innerHTML += data.forecast         
            }
        })
})
})
