//variables globales


class ControladorProducto {
    constructor() {
        this.listaProductos = []
    }
    agregar(producto) {
        if (producto instanceof Producto) {
            this.listaProductos.push(producto)
        }
    }
    mostrarListaProductos() {
        let contenedorProductos = document.getElementById("contenedor_productos")
            // muestro en el dom los productos
        this.listaProductos.forEach(producto => {
            contenedorProductos.innerHTML += producto.descripcionProducto()
        })
        this.listaProductos.forEach(producto => {
            const btn_ap = document.getElementById(`ap-${producto.id}`)
                // agrego evento al boton añadir
            btn_ap.addEventListener("click", () => {
                carrito.agregar(producto)
                carrito.guardarEnStorage()
                carrito.mostrarListaCarrito() //refresca lista carrito
            })
        })
    }
}

//  clases
class Producto {
    constructor(id, nombre, descripcion, stock, precio, img, cantidad = 1) {
        this.id = id
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.stock = stock;
        this.precioUni = precio;
        this.img = img;
        this.cantidad = cantidad;
        this.precioVenta = 0;
    }
    descripcionCarrito() { // card horizontal para  mostrar productos en carrito 
        return `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${this.img}" class="img-fluid rounded-start" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${this.nombre}</h5>
                        <p class="card-text">Cantidad  <button class"btn-primary id="btn_disminuir-${this.id}"><i class="fa-solid fa-minus"></i></button>  ${this.cantidad}  <button class"btn-primary id="btn_aumentar-${this.id}"><i class="fa-solid fa-plus"></i></button></p>
                        <p class="card-text">Precio: ${this.precioUni}</p>
                    </div>
                    <div>
                        <button class="btn btn-secondary" id="btn_eliminar-${this.id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>`
    }

    descripcionProducto() { //cadr vertical para mpostrar productos en la pagina
        return `
        <div class="card border-light" style="width: 18rem;">
            <img src="${this.img}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${this.nombre}</h5>
                <p class="card-text">${this.descripcion}</p>
                <p class="card-text">$${this.precioUni}</p>
                <button class="btn btn-primary" id="ap-${this.id}">Añadir al carrito</button>
            </div>
        </div>`
    }
}

class Carrito {
    constructor() {
        this.listaDeCompras = [];

    }
    agregar(productoAgregar) {
        let enlista = this.listaDeCompras.some(prod => prod.id == productoAgregar.id)
        if (enlista == true) {
            let producto = this.listaDeCompras.find(producto => producto.id == productoAgregar.id)
            producto.cantidad += 1
        } else {
            this.listaDeCompras.push(productoAgregar)
        }

    }
    eventoAumentar() {
        this.listaDeCompras.forEach(producto => {
            //obtener el id de los botones
            let btn_aumentar = document.getElementById(`btn_aumentar-${producto.id}`)
                //darle el evento
            btn_aumentar.addEventListener("click", () => {
                //eliminar del carrito
                this.aumentarCantidad(producto)
                    //actualizar storage
                this.guardarEnStorage()
                    //mostrarEnDOM
                this.mostrarListaCarrito()
            })
        })
    }
    eventoDisminuir() {
        this.listaDeCompras.forEach(producto => {
            //obtener el id de los botones
            let btn_disminuir = document.getElementById(`btn_disminuir-${producto.id}`)
                //darle el evento
            btn_disminuir.addEventListener("click", () => {
                //eliminar del carrito
                this.disminuirCantidad(producto)
                    //actualizar storage
                this.guardarEnStorage()
                    //mostrarEnDOM
                this.mostrarListaCarrito()
            })
        })
    }
    aumentarCantidad(productoAumentar) {
        this.listaDeCompras.forEach(prod => prod.id == productoAumentar.id)
        if (productoAumentar.cantidad < productoAumentar.stock) {
            productoAumentar.cantidad += 1
        }

    }

    disminuirCantidad(productoDisminuir) {
        this.listaDeCompras.forEach(prod => prod.id == productoDisminuir.id)
        if (productoDisminuir.cantidad > 1 && productoDisminuir.stock > 1) {
            productoDisminuir.cantidad -= 1
        }
    }
    mostrarTotal() {
        let compraTotal = document.getElementById("compraTotal")
        compraTotal.innerText = `el total de la compra es: $${this.calcularTotal()}`
    }
    calcularTotal() {
        return this.listaDeCompras.reduce((acumulador, producto) => acumulador + producto.precioUni * producto.cantidad, 0)
    }
    mostrarListaCarrito() {
        let contenedorCarrito = document.getElementById("contenedor_carrito")
        contenedorCarrito.innerHTML = ""
        this.listaDeCompras.forEach(producto => {
            contenedorCarrito.innerHTML += producto.descripcionCarrito()
        })
        this.eventoAumentar()
        this.eventoDisminuir()
        this.mostrarTotal()
        this.eventoEliminar()
        this.vaciarCarrito() 
    }
    eliminar(productoEliminar) {
        let indice = this.listaDeCompras.findIndex(producto => producto.id == productoEliminar.id)
        this.listaDeCompras.splice(indice, 1)
    }
    eventoEliminar() {
        this.listaDeCompras.forEach(producto => {
            //obtener el id de los botones
            let btn_eliminar = document.getElementById(`btn_eliminar-${producto.id}`)
                //darle el evento
            btn_eliminar.addEventListener("click", () => {
                //eliminar del carrito
                this.eliminar(producto)
                    //actualizar storage
                this.guardarEnStorage()
                    //mostrarEnDOM
                this.mostrarListaCarrito()
            })
        })
    }
    guardarEnStorage() {
        let listaDeComprasJSON = JSON.stringify(this.listaDeCompras)
        localStorage.setItem("listaDeCompras", listaDeComprasJSON)
    }
    recuperarStorage() {
        let listaDeComprasJSON = localStorage.getItem("listaDeCompras")
        let listaDeComprasJS = JSON.parse(listaDeComprasJSON)
        let listaAux = []
        listaDeComprasJS.forEach(producto => {
            //(id, nombre,descripcion,stock,precioUni img,cantidad,precioVenta
            let nuevoProducto = new Producto(producto.id, producto.nombre, producto.descripcion, producto.stock, producto.precioUni, producto.img, producto.cantidad, producto.precioVenta)
            listaAux.push(nuevoProducto)
        })
        this.listaDeCompras = listaAux
    }

    vaciarCarrito() {
        let vaciarCarrito = document.getElementById(`btn_vaciarCarrito`)
        vaciarCarrito.addEventListener("click", () => {
            this.listaDeCompras = []
            this.guardarEnStorage()
            this.mostrarListaCarrito()
        })

    }
}

// programa principal

const cp = new ControladorProducto();
let carrito = new Carrito();

let producto1 = new Producto(1, "jean kate", "De tiro bajo y extra largo, esta nueva base se suma a la colección para recrear una influencia dosmilera y destacada. Su tejido es super blando 100% algodón ", 100, 60000, "https://www.kosiuko.com/media/catalog/product/1/5/1510371142az5_1.jpg?optimize=low&fit=bounds&height=215&width=160")
let producto2 = new Producto(2, "bota conwoy", "Botas Cowboy Style 100% de cuero vacuno, con bordado a contratono en los laterales y taco de 9cm. ", 50, 120000, "https://www.kosiuko.com/media/catalog/product/3/8/3895221102r12.jpg?optimize=low&fit=bounds&height=215&width=160")
let producto3 = new Producto(3, "cinto lazoo", "Cinturon confeccionado en cuero 100% vacuno. Detalle de hebilla plateada con inspiracion texana.", 50, 43000, "https://www.kosiuko.com/media/catalog/product/3/8/3893071102ne2.jpg?optimize=low&fit=bounds&height=215&width=160")
let producto4 = new Producto(4, "pantalon macro zebra", "Pantalón wide leg full print con estampa Macro zebra beat, exclusiva de la CURVA colección. Posee pinzas, bolsillos laterales y bolsillos ojal simulados en trasero.", 100, 56000, "https://www.kosiuko.com/media/catalog/product/3/8/3890181242al1.jpg?optimize=low&fit=bounds&height=215&width=160")
let producto5 = new Producto(5, "jean kate west", "Este jean de tiro medio es el icono de nuestra capsula West. Este item es lo que necesitas para rockear el western style.", 100, 35000, "https://www.kosiuko.com/media/catalog/product/1/5/1510031142az1.jpg?optimize=low&fit=bounds&height=215&width=160")
let producto6 = new Producto(6, "falda path", "La falda patch confeccionada con tejidos 100 % algodón azul, es un ítem trendy que realza mucho tu outfit llevandolo al máximo, ideal para matchearla con la “campera patch”.", 100, 25000, "https://www.kosiuko.com/media/catalog/product/1/5/1509341142az1_1.jpg?optimize=low&fit=bounds&height=215&width=160")
let producto7 = new Producto(7, "camisaco", "Camisaco con inspiracion texana confeccionado en gabardina. Detalle de canesu en punta con diseño de cristales. ", 5, 130000, "https://www.kosiuko.com/media/catalog/product/3/8/3892061242cr1.jpg?optimize=low&fit=bounds&height=215&width=160")

carrito.recuperarStorage()
carrito.mostrarListaCarrito()

cp.agregar(producto1)
cp.agregar(producto2)
cp.agregar(producto3)
cp.agregar(producto4)
cp.agregar(producto5)
cp.agregar(producto6)
cp.agregar(producto7)
cp.mostrarListaProductos();