const socket = io()

socket.on("getProducts", products => {
    const ProductsServerList = document.getElementById("ProductsServerList")
    ProductsServerList.innerHTML=""    
    
    products.forEach(product => {
        ProductsServerList.innerHTML += 
        `
            <div class="productCard"> 
                <div class="id">${product.id}</div>
                <div class="title">${product.title}</div>
                <div class="descriptionList">${product.description}</div>
                <div class="price">$ ${product.price}</div>
                <div class="thumbnail">
                <img src= "img/${product.thumbnail}"></img>                
                </div>
                <div class="code">${product.code}</div>
                <div class="stock">${product.stock}</div>
                <div class="category">${product.category}</div>
                <div class="status">${product.status}</div>
                <div class="deleteButton titleCards">
                    <button onclick="deleteProduct(${product.id})">
                        Eliminar
                    </button>
                </div>
            </div>
        `
    })
})

addProduct = () => {
    const title         = document.getElementById("title")
    const description   = document.getElementById("description")
    const price         = document.getElementById("price")
    const thumbnail     = document.getElementById("thumbnail")
    const code          = document.getElementById("code")
    const stock         = document.getElementById("stock")
    const category      = document.getElementById("category")
    const status        = document.getElementById("status")

    let product = {
        "title":        title.value || undefined ,
        "description":  description.value || undefined,
        "price":        price.value || undefined,
        "thumbnail":    thumbnail.value || undefined,
        "code":         code.value || undefined,
        "stock":        stock.value || undefined,
        "category":     category.value || undefined,
        "status":       status.value || undefined
    }
    socket.emit("addProduct", product);
}

socket.on("resultAddProduct", mensaje => {
    console.log("Resultado agregado del producto: ", mensaje);
})

deleteProduct = (id) => {        
    socket.emit("deleteProduct", id);
}

socket.on("resultDelectProduct", mensaje => {
    console.log("Resultado eliminacion del producto: ", mensaje);
})

