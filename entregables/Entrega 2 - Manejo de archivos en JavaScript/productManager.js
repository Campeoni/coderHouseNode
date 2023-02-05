import {promises as fs} from 'fs';

class ProductManager{

  //Ejecuta apenas se instancia
  constructor(path) {     
    this.path = path
    this.id = 0
  }

  //Crea el archivo inicializado
  createFile = async() => { 
    try{
      const voidProduct = "[]"
      await fs.writeFile(this.path,voidProduct)     
      return await this.getProducts ()
    } catch (error){
      console.log("error del catch: ",error);      
    }    
  } 

  // Consulta el archivo. En caso de no existir datos crea el archivo
  getProducts = async() => {
      try{
        const fileInformation = await fs.readFile(this.path, 'utf-8')  //Pasar de JSON a Objeto
        const products = JSON.parse(fileInformation)
        //devuelve productos
        return products  
        
      } catch (error){
        //console.log("error del catch: ",error);
        //si da error es porque no existe y lo creo
        const answer = await this.createFile()
        return answer        
      }      
  } 

  // Añade nuevo producto
  addProduct = async(title, description, price, thumnail, code, stock) => {    
    try{
      const newProduct = {title, description, price, thumnail, code, stock} //crea un objeto con los datos de entrada
      
      if (!(this.hasVoid(newProduct))) { //valida si tiene campos vacios
        const products = await this.getProducts();
  
        const ordProduct = products.sort((a, b)=> { //ordena descendentemente
          if (a.id < b.id) {
            return 1;
          }
          if (a.id > b.id) {
            return -1;
          }
          return 0;
        })

        let idAux =  0 // inicializa por si el array esta vacio
        
        if (ordProduct.length !== 0) {
          idAux = ordProduct[0].id //en caso que ya exista 1 caso mueve el > id
        }
        
        const id = ProductManager.autoincrementalID(idAux);

        products.push({id,...newProduct} )   
        await fs.writeFile(this.path, JSON.stringify(products))
        return true
            
      } else {
        return `Hay campos vacios! -> ", ${newProduct}`
      }
    }catch (error){
      console.log(error);
    }
  } 

  //Busca producto por ID
  getProductById = async(id) => {
    try{
            
      if (id) {
        const products = await this.getProducts();
  
        //si hay productos busca si hay alguno con ese ID
        if (products.length!==0){
          const productFilter = products.filter(element => element.id === id)

          if (productFilter.length !== 0) {
            return productFilter[0]
          } else {
            return "No existe ningun producto con ese ID";
          }
        } else {
          return "No hay productos";
        }
      } else {
        return "Se debe informar un ID";
      }
    }catch (error){
      console.log(error);
    }
  }   

  //Actualizao producto por ID
  updateProduct = async(id, title, description, price, thumnail, code, stock) => {

    const productExist = await this.getProductById(id); // Valido que exista el ID

    if (productExist?.id ){
      const products = await this.getProducts();
      
      const index = products.findIndex(element => element.id === id) // Busco el indice del elemento
      
      title && (products[index].title = title)
      description && (products[index].description = description)
      price && (products[index].price = price)
      thumnail && (products[index].thumnail = thumnail)
      code && (products[index].code = code)
      stock && (products[index].stock = stock)
      
      await fs.writeFile(this.path,JSON.stringify(products)) // grabo 
      return true
    } else {
      return productExist // en caso de no existir el id muestro mensaje 
    }    
  }   

  //Elimina producto por ID
  deleteProduct = async(id) => {

    const productExist = await this.getProductById(id); // Valido que exista el ID
    
    if (productExist?.id ){
      const products = await this.getProducts();
      const productFilter = products.filter(element => element.id !== id) // saco el producto con el id
      await fs.writeFile(this.path,JSON.stringify(productFilter)) // grabo 
      return true
    } else {
      return productExist // en caso de no existir el id muestro mensaje 
    }    
  }
    
  //Valida que todos los campos esten completos
  hasVoid(obj) {
    for (const key in obj) {
      if (!obj[key]) {
        return true;
      }
    }
    return false;
  };

  // Autoincrementa +1 segun el id informado
  static autoincrementalID(lastId){
    return lastId + 1;
  }
}

//Crea nueva instancia de ProductManager
const administrador = new ProductManager("./prueba.txt");


const crear = async (title, description, price, thumnail, code, stock) => {
  console.log("crear: ", await administrador.addProduct(title, description, price, thumnail, code, stock));  
}

const consulta = async () => {
  console.log("consulta: ", await administrador.getProducts());
}  

const buscarId = async (id) => {
  console.log("buscar por ID: ", await administrador.getProductById(id));
}  

const eliminaId = async (id) => {
  console.log("elimina por ID: ", await administrador.deleteProduct(id));
}  

const updateId = async (id, title, description, price, thumnail, code, stock) => {
  console.log("Acctualizado por ID: ", await administrador.updateProduct(id, title, description, price, thumnail, code, stock));
}  

const prueba = async () => {
  await consulta();
  await crear("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25 );
  await consulta();
  await buscarId(1);
  await buscarId(2);
  await updateId(1,"producto actualizado","", "","","");
  await buscarId(1);
  await eliminaId(1);
  await buscarId(1);
}

prueba();




