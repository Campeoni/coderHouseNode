fetch('https://criptoya.com/api/dolar')
.then( response => response.json())
.then((response) => {
    console.log(response)    
})

