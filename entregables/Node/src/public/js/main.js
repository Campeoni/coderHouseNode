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


deleteProduct = (id) => {    
    
    socket.emit("deleteProduct", id)
}

