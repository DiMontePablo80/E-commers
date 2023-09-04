//variables globales


class ControladorProducto {
    constructor() {
        this.listaProductos = []
    }
    agregar(producto) {
        this.listaProductos.push(producto)
    }
    mostrarListaProductos() {
        let contenedorProductos = document.getElementById("contenedor_productos")

        this.listaProductos.forEach(elemento => {
            contenedorProductos.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src=${elemento.img} class="card-img-top" alt="..."></img>
                <div class="card-body">
                    <h5 class="card-title">${elemento.nombre}</h5>
                    <p class="card-text">${elemento.descripcion} </p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">unidade disponibles ${elemento.stock}</li>
                    <li class="list-group-item">$ ${elemento.precioUni}</li>
                </ul>
                <div class="card-body">
                    <button id="ap-${elemento.id}" class="card-link">agregar al carrito </button>
                    <button class="card-link">cerrar</button>
                </div>
            </div>`
        })

        this.listaProductos.forEach(elemento => {
            let btn_ap = document.getElementById(`ap-${elemento.id}`)

            btn_ap.addEventListener("clic", () => {
                carrito.agregar(elemento)
                carrito.mostrarListaCarrito()
            })
        })
    }

}

//  clases
class Producto {
    constructor(id, nombre, descripcion, cantidad, precio, img) {
        this.id = id
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.stock = cantidad;
        this.precioUni = precio;
        this.img = img;
        this.cantidad = 1;
        this.precioVenta = 0;
    }

}

class Carrito {
    constructor() {
        this.listaDeCompras = [];
    }
    agregar(producto) {
        this.listaDeCompras.push(producto)
    }

    mostrarListaCarrito() {
        let contenedorCarrito = document.getElementById("contenedor_carrito")
        contenedorCarrito.innerHTML = " ";
        this.listaDeCompras.forEach(producto => {
            contenedorCarrito.innerHTML += `
            <div class="card mb-3" style="max-width: 440px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${producto.img}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">cantidad: ${producto.cantidad}</p>
                            <p class="card-text"> precio: ${producto.precioUni}</p>
                        </div>
                    </div>
                </div>
            </div>`
        })

    }
}

// progrma principal

const cp = new ControladorProducto();
let carrito = new Carrito();

let producto1 = new Producto(1, "jean kate", "De tiro bajo y extra largo, esta nueva base se suma a la colección para recrear una influencia dosmilera y destacada. Su tejido es super blando 100% algodón ", 100, 60000, "https://www.kosiuko.com/media/catalog/product/1/5/1510371142az5_1.jpg?optimize=low&fit=bounds&height=215&width=160")
let producto2 = new Producto(2, "bota conwoy", "Botas Cowboy Style 100% de cuero vacuno, con bordado a contratono en los laterales y taco de 9cm. ", 50, 120000, "https://www.kosiuko.com/media/catalog/product/3/8/3895221102r12.jpg?optimize=low&fit=bounds&height=215&width=160")
let producto3 = new Producto(3, "cinto lazoo", "Cinturon confeccionado en cuero 100% vacuno. Detalle de hebilla plateada con inspiracion texana.", 50, 43000, "https://www.kosiuko.com/media/catalog/product/3/8/3893071102ne2.jpg?optimize=low&fit=bounds&height=215&width=160")
let producto4 = new Producto(4, "pantalon macro zebra", "Pantalón wide leg full print con estampa Macro zebra beat, exclusiva de la CURVA colección. Posee pinzas, bolsillos laterales y bolsillos ojal simulados en trasero.", 100, 56000, "https://www.kosiuko.com/media/catalog/product/3/8/3890181242al1.jpg?optimize=low&fit=bounds&height=215&width=160")
let producto5 = new Producto(5, "jean kate west", "Este jean de tiro medio es el icono de nuestra capsula West. Este item es lo que necesitas para rockear el western style.", 100, 35000, "https://www.kosiuko.com/media/catalog/product/1/5/1510031142az1.jpg?optimize=low&fit=bounds&height=215&width=160")
let producto6 = new Producto(6, "falda path", "La falda patch confeccionada con tejidos 100 % algodón azul, es un ítem trendy que realza mucho tu outfit llevandolo al máximo, ideal para matchearla con la “campera patch”.", 100, 25000, "https://www.kosiuko.com/media/catalog/product/1/5/1509341142az1_1.jpg?optimize=low&fit=bounds&height=215&width=160")
let producto7 = new Producto(7, "camisaco", "Camisaco con inspiracion texana confeccionado en gabardina. Detalle de canesu en punta con diseño de cristales. ", 50, 130000, "https://www.kosiuko.com/media/catalog/product/3/8/3892061242cr1.jpg?optimize=low&fit=bounds&height=215&width=160")
cp.agregar(producto1)
cp.agregar(producto2)
cp.agregar(producto3)
cp.agregar(producto4)
cp.agregar(producto5)
cp.agregar(producto6)
cp.agregar(producto7)
cp.mostrarListaProductos()