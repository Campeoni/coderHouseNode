import express, { application } from "express";
import { __dirname } from "./path.js";
import * as path from 'path'
import multer from 'multer'
import { engine } from 'express-handlebars';
import {Server} from "socket.io";
import ProductManager from "./controllers/ProductsManager.js"

//rutas
import routerProducts from './routes/products.routes.js'
import routerCarts from './routes/carts.routes.js'
import routerRealtimeProducts from './routes/productsWebSocket.routes.js'
import routerProductsList from './routes/productsList.routes.js'

const P_M = new ProductManager('src/models/products.txt');

// Configurar Multer para almacenar los archivos subidos en el servidor
const storage = multer.diskStorage({
  destination: (req,file, cb) => {
    cb(null, __dirname + '/public/img')
  },
  filename: (req, file, cb) => {
    console.log("nombre= ", file.originalname);
    cb(null, file.originalname);
  }
} );

// Inicializar Multer con la configuración de almacenamiento
const upload = multer({ storage });

const app = express(); 
const PORT = 4000;

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Permite realizar consultas en la URL (req.query)

//configuracion HandleBars
app.engine('handlebars', engine());   //configuración del motor de express
app.set('view engine', 'handlebars'); //indica que usaremos el motor de vista handlebars
app.set('views', path.resolve(__dirname, './views')); //__dirname + './views'

//ServerIO
const io = new Server(server)

//Conexion Server SocketIo
io.on("connection", async (socket)=> {  
  console.log("cliente socket conectado!");

  socket.emit("getProducts", await P_M.getProducts());
  
  socket.on("deleteProduct", async id => {
    socket.emit("msgDeleteProduct", await P_M.deleteProduct(parseInt(id)))
    socket.emit("getProducts", await P_M.getProducts())
})
  
/*   //Recibe info desde el Front End con clave "mensaje_saludo"
  socket.on("mensaje_saludo", info =>{    
    console.log("mensaje_saludo=", info);
  }) 
  
  //Recibe info desde el Fron End con clave "mensaje_con_objeto"
  socket.on("mensaje_con_objeto", info =>{    //Cuando se recibe informacion del cliente (canal de conexion)
    console.log("mensaje_con_objeto=", info);
  }) 
  
  //Emite info desde el Servidor con clave "mensaje_general"
  socket.emit("mensaje_general", "Hola, desde el servidor")   */
  
})

//Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/', routerProductsList)
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/realtimeproducts', routerRealtimeProducts)

app.post('/upload', upload.single('file'), (req,res) =>{
  console.log("req body: ",req.body);
  console.log("req file: ", req.file);
  
  res.send("imagen cargada")
})

//si una URL no es valida mostramos un mensaje
app.use(function(req, res, next) {
  res.status(404).send('Lo siento, no se pudo encontrar la página que estás buscando.');
});