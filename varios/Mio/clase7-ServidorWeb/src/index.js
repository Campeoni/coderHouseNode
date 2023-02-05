import express from 'express'

const app = express() //app es igual a la ejecucion de express
const PORT = 4000

const users = [
    {
        nombre: "Fran",
        apellido: "Pugh",
        id: 0,
        cargo: "Profesor"
    },
    {
        nombre: "Kevin",
        apellido: "Quispe",
        id: 1,
        cargo: "Tutor"
    },
    {
        nombre: "Pablo",
        apellido: "Barbero",
        id: 2,
        cargo: "Tutor"
    }
]

app.use(express.urlencoded({extended:true})) //Permite realizar consultas en la URL (req.query)
app.use(express.json())

app.get('/', (req,res) => {
    res.send("Este es mi primer servidor con Express")
})


//http://localhost:4000/user?cargo=Tutor&nombre=Kevin
app.get('/user', (req,res) => {
    let {cargo, nombre, sueldo} = req.query
    const usuarios = users.filter(user => user.cargo === cargo)
    res.send(JSON.stringify(usuarios))
})

app.get('/user/:idUser', (req,res) => {
    const idUser = req.params.idUser

    const user = users.find(user => user.id === parseInt(idUser))
    if(user) {
        res.send(`Nombre de usuario ${user.nombre}`)
    } else {
        res.send(`El usuario no existe`)
    }    
})

app.get('/users', (req,res) => {        
    let usuarios = JSON.stringify(users)
    res.send(`usuarios ${usuarios}`)    
})

//http://localhost:4000/user
app.post('/user', (req,res) => {
    let {nombre, apellido, cargo } = req.body
    console.log("req.query=",req.body);
    const id = users.length
    users.push({nombre, apellido, id, cargo})
    console.log("usuarios= ", users);
    res.send("usuario creado")
})


//http://localhost:4000/user?cargo=Tutor&nombre=Kevin
app.put('/user', (req,res) => {
    let {nombre, apellido, cargo } = req.query

    const id = users.length
    users.push({nombre, apellido, id, cargo})
    console.log("usuarios= ", users);
    res.send("usuario creado")
})

app.listen(PORT, () => {
    console.log(`Server ${PORT}`);        
})