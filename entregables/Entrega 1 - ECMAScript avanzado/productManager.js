class ProductManager{
  constructor() {
    this.products = []        
  }

  addProduct(title, description, price, thumnail, code, stock) {    
    const codes = this.products.map(element => element.code)
    const exist = codes.includes(code);      

    if (!exist) {

      const newProduct = {title, description, price, thumnail, code, stock}
      
      if (!(this.hasVoid(newProduct))) {

        const id = ProductManager.autoincrementalID(this.products);
        this.products.push({id,...newProduct} )   

      } else {
        console.log("Hay campos vacios! -> ", newProduct);
      }

    } else {
      console.log("duplicated code! -> ", code);
    }
  }

  getProducts() {
    return this.products
  }

  getProductById(id){
    
    const element = this.products.filter(element => element.id === id)

    if (element.length > 0) {
      return element 
    } else{
      console.log("NOT FOUND")    
    }
  }
  hasVoid(obj) {
    for (const key in obj) {
      if (!obj[key]) {
        return true;
      }
    }
    return false;
  };

  // recupera la longitud y le suma 1, de esta manera es autoincremental y no se repite. Se define estatico para que no pueda ser invocado desde la instancia
  static autoincrementalID(elements){
    return (elements.length + 1);
  }
}


const administrador = new ProductManager();


console.log(administrador.getProducts());

administrador.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25 )

console.log(administrador.getProducts());

administrador.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25 )

console.log(administrador.getProductById(2));
console.log(administrador.getProductById(1));
