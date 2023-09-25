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
    descripcionProducto() {
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
    descripcionCarrito() {
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


}

class ControladorProducto {
    constructor() {
        this.listaProductos = []
        this.listaFiltrada = []
    }
    agregar(producto) {
        if (producto instanceof Producto) {
            this.listaProductos.push(producto)
        }
    }
    eventoFiltrar() {
        this.ordenarMenorAMayor()
        this.ordenarMayorAMenor()
        this.mostrarTodo()
    }
    ordenarMenorAMayor() {
        this.listaFiltrada = []
        const opcion_may_men = document.getElementById("may_men")
        opcion_may_men.addEventListener("click", () => {
            this.listaFiltrada = this.listaProductos.sort(function(a, b) {
                if (a.precioUni > b.precioUni) {
                    return -1
                }
                if (a.precioUni < b.precioUni) {
                    return 1
                }
                return 0
            })
            this.mostrarListafiltrada()

        })


    }
    ordenarMayorAMenor() {
        this.listaFiltrada = []
        const opcion_men_may = document.getElementById("men_may")
        opcion_men_may.addEventListener("click", () => {
            this.listaFiltrada = this.listaProductos.sort(function(a, b) {
                if (a.precioUni > b.precioUni) {
                    return 1
                }
                if (a.precioUni < b.precioUni) {
                    return -1
                }
                return 0
            })
            this.mostrarListafiltrada()
        })


    }
    mostrarTodo() {

        const opcion_MostrarTodo = document.getElementById("abc")
        opcion_MostrarTodo.addEventListener("click", () => {
            this.listaProductos = []
            this.incorporarAPI()

        })

    }
    async incorporarAPI() {
        let respJson = await fetch(`simuladorAPI.json`)
        let listaJS = await respJson.json()
        listaJS.forEach(elemento => {
            let nuevoProducto = new Producto(elemento.id, elemento.nombre, elemento.descripcion, elemento.stock, elemento.precio, elemento.img)
            this.agregar(nuevoProducto)
        })
        this.mostrarListaProductos()


    }
    mostrarListaProductos() {
        let contenedor_productos = document.getElementById("contenedor_productos")
        contenedor_productos.innerHTML = ""
        this.listaProductos.forEach(producto => {
            contenedor_productos.innerHTML += producto.descripcionProducto()
        })
        this.listaProductos.forEach(producto => {
            const btn_ap = document.getElementById(`ap-${producto.id}`)
            btn_ap.addEventListener("click", () => {
                Toastify({
                    text: "añadiendo...",
                    duration: 2000
                }).showToast();
                carrito.agregar(producto)
                carrito.guardarEnStorage()
                carrito.mostrarListaCarrito()

            })
        })
    }
    mostrarListafiltrada() {
        let contenedor_productos = document.getElementById("contenedor_productos")
        contenedor_productos.innerHTML = ""
        this.listaFiltrada.forEach(producto => {
            contenedor_productos.innerHTML += producto.descripcionProducto()
        })
        this.listaProductos.forEach(producto => {
            const btn_ap = document.getElementById(`ap-${producto.id}`)
            btn_ap.addEventListener("click", () => {
                Toastify({
                    text: "añadiendo...",
                    duration: 2000
                }).showToast();
                carrito.agregar(producto)
                carrito.guardarEnStorage()
                carrito.mostrarListaCarrito()

            })
        })
    }
}

class Carrito {
    constructor() {
        this.listaDeCompras = [];
        this.localStorageKey = "listaDeCompras"
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
            let btn_aumentar = document.getElementById(`btn_aumentar-${producto.id}`)
            btn_aumentar.addEventListener("click", () => {
                this.aumentarCantidad(producto)
                this.guardarEnStorage()
                this.mostrarListaCarrito()
            })
        })
    }
    eventoDisminuir() {
        this.listaDeCompras.forEach(producto => {
            let btn_disminuir = document.getElementById(`btn_disminuir-${producto.id}`)
            btn_disminuir.addEventListener("click", () => {
                this.disminuirCantidad(producto)
                this.guardarEnStorage()
                this.mostrarListaCarrito()
            })
        })
    }
    aumentarCantidad(productoAumentar) {
        this.listaDeCompras.forEach(prod => prod.id == productoAumentar.id)
        if (productoAumentar.cantidad < productoAumentar.stock) {
            productoAumentar.cantidad += 1
            productoAumentar.stock -= 1
        }

    }

    disminuirCantidad(productoDisminuir) {
        this.listaDeCompras.forEach(prod => prod.id == productoDisminuir.id)
        if (productoDisminuir.cantidad > 1 && productoDisminuir.stock > 1) {
            productoDisminuir.cantidad -= 1
            productoDisminuir.stock += 1
        }
    }
    mostrarTotal() {
        let compraTotal = document.getElementById("compraTotal")
        compraTotal.innerText = `el total de la compra es: $${this.calcularTotal()}`
    }
    calcularTotal() {
        return this.listaDeCompras.reduce((acumulador, producto) => acumulador + producto.precioUni * producto.cantidad, 0)
    }
    finalizarCompra() {
        let btn_fc = document.getElementById(`finalizarCompra`)
        btn_fc.addEventListener("click", () => {
            if (this.listaDeCompras.length == 0) {
                swal("debes ingresar productos al carrito");
                this.mostrarListaCarrito()
            }




        })

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
        this.finalizarCompra()

    }
    eliminar(productoEliminar) {
        let indice = this.listaDeCompras.findIndex(producto => producto.id == productoEliminar.id)
        this.listaDeCompras.splice(indice, 1)
    }
    eventoEliminar() {
        this.listaDeCompras.forEach(producto => {
            let btn_eliminar = document.getElementById(`btn_eliminar-${producto.id}`)
            btn_eliminar.addEventListener("click", () => {
                swal("estas seguro de quitar el producto del carrito?", {
                        buttons: ["No!", "Si!"],
                        icon: "warning"
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            swal("se eliminó producto del carrito", {
                                icon: "success",
                            });
                            this.eliminar(producto)
                            this.guardarEnStorage()
                            this.mostrarListaCarrito()
                        }
                    })
            })
        })
    }
    guardarEnStorage() {
        let listaDeComprasJSON = JSON.stringify(this.listaDeCompras)
        localStorage.setItem("listaDeCompras", listaDeComprasJSON)
    }
    recuperarStorage() {

        let listaDeComprasJS = JSON.parse(localStorage.getItem("listaDeCompras")) || []
        listaDeComprasJS.forEach(producto => {
            let nuevoProducto = new Producto(producto.id, producto.nombre, producto.descripcion, producto.stock, producto.precioUni, producto.img, producto.cantidad, producto.precioVenta)
            listaDeComprasJS.push(nuevoProducto)
        })

    }

    vaciarCarrito() {
        let vaciarCarrito = document.getElementById(`btn_vaciarCarrito`)
        vaciarCarrito.addEventListener("click", () => {

            if (this.listaDeCompras.length > 0) {
                swal({
                        title: "Estas seguro ?",
                        text: "Estas a punto de vaciar el carrito",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            this.listaDeCompras = []
                            this.guardarEnStorage()
                            this.mostrarListaCarrito()
                            swal("se vacio el carrito correctamente", {
                                icon: "success",
                            })
                        }
                    })
            } else {

                Toastify({
                    text: "no hay productos en el carrito",
                    duration: 2000
                }).showToast();
            }


        })

    }
}

// programa principal

const cp = new ControladorProducto();
let carrito = new Carrito();

carrito.recuperarStorage()
carrito.mostrarListaCarrito()

cp.incorporarAPI()
cp.eventoFiltrar()