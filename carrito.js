//variables globales

let listaProductos = []
let producto = ""

//  clases
class Producto {
    constructor(id, nombre, cantidad, precio) {
        this.id = id
        this.nombre = nombre;
        this.stock = cantidad;
        this.precioUni = precio;
        this.cantidad = 1;
        this.precioVenta = 0;
    }

}
class Carrito {
    constructor() {
        this.iva = 1.21;
        this.listaDeCompras = [];
    }
    agregar(producto, listaProducto) {
        for (const objeto of listaProducto) {
            if (objeto.nombre == producto) {
                this.listaDeCompras.push(objeto);

            }
        }

    }
    comprarMas(listaProducto, producto, cantidadCompra) {
        for (const elemento of listaProducto) {
            if (elemento.nombre == producto) {
                elemento.cantidad = cantidadCompra;
                this.listaDeCompras.push(elemento)
            }
        }
    }
    controlStock() {
        for (const objeto of this.listaDeCompras) {
            objeto.stock = objeto.stock - objeto.cantidad;
        }
    }
    sumarIva() {
        this.listaDeCompras.forEach(producto => { producto.precioVenta = producto.precioUni * this.iva });

    }
    totalCompra() {
        return this.listaDeCompras.reduce((acumulador, producto) => acumulador = acumulador + (producto.cantidad * producto.precioUni), 0)
    }
    mostrar() {

        return this.listaDeCompras.reduce((acumulador, producto) => acumulador = acumulador + ("producto: \t" + producto.nombre + "  cantidad:  x\t " + producto.cantidad + "  precio: \t" + producto.precioVenta + "\n"), " ")
    }

}
// funciones
function mostrarListaProductos(listaProductos) {
    let acumulador = "";
    listaProductos.forEach((producto) => acumulador += "id: " + producto.id + "\tproducto: " + producto.nombre + "\tstock: " + producto.stock + "\t  cantidad: " + producto.cantidad + "  precio: \t" + producto.precioUni + "\n")
    return acumulador;
}

function buscarProducto(listaProductos, seleccion) {
    return listaProductos.some((producto) => producto.nombre == seleccion)
}

function creditoSantander(compra) {
    let promo = 0.15;
    let total = compra - (compra * promo)
    return total
}

function creditoCencosud(compra) {
    let promo = 0.10;
    let total = compra - (compra * promo)
    return total
}

// progrma principal

listaProductos.push(producto = new Producto(1, "remera", 120, 3400));
listaProductos.push(producto = new Producto(2, "pantalon", 200, 30400));
listaProductos.push(producto = new Producto(3, "cinto", 30, 5000));
listaProductos.push(producto = new Producto(4, "bermuda", 50, 10000));
listaProductos.push(producto = new Producto(5, "campera", 10, 34000));


alert(mostrarListaProductos(listaProductos))
opcion = prompt("desea agregar un producto al carrito? ingese si o no");
while (opcion != "si" && opcion != "no" && typeof(opcion) != String) {
    opcion = prompt("desea agregar un producto al carrito? ingese si o no");
}
let carrito = new Carrito();
while (opcion == "si") {

    let producto = prompt("ingrese nombre del producto: ")
    let respuesta1 = buscarProducto(listaProductos, producto);
    if (respuesta1 == true) {
        let respuesta2 = prompt("desea agregar mas cantidad de " + producto + " ?.Ingrese si o no")
        while (respuesta2 != "si" && respuesta2 != "no" && typeof(respuesta2) != String) {
            respuesta2 = prompt("desea agregar mas unidades de " + producto + "?.Ingese si o no")

        }
        if (respuesta2 == "si") {
            let cantidad = Number(prompt("cuantas unidades quiere agregar:"))
            carrito.comprarMas(listaProductos, producto, cantidad)
            alert("se añadio al carrito " + cantidad + " de " + producto)
        } else if (respuesta2 == "no") {
            carrito.agregar(producto, listaProductos)
            alert("se agregó 1 unidad de " + producto + " al carrito")
        }

    } else if (respuesta1 == false) {
        alert("el producto no se encuentra en la lista")
    }
    opcion = prompt("desea agregar un producto al carrito? ingese si o no")
    while (opcion != "si" && opcion != "no" && typeof(opcion) != String) {
        opcion = prompt("desea agregar un producto al carrito? ingese si o no")
    }

}
alert("esta a punto de finalizar la compra. Estamos Preparando su pedido")
carrito.sumarIva(carrito.listaDeCompras)
alert(carrito.mostrar())
let total = carrito.totalCompra(carrito.listaDeCompras)
carrito.controlStock()
let respuesta3 = Number(prompt("total a pagar es: $" + total + "\nseleccione metodo de pago:\n 1)debito\n  2)credito Santander( 15% off )\n 3) credito Cencosud (10% off) "))
while (respuesta3 < 1 && respuesta3 > 3) {
    respuesta3 = Number(prompt("seleccione metodo de pago: 1)debito  2)credito Santander( 15% off ) 3) credito Cencosud (10% off) "))
}
switch (respuesta3) {
    case 1:
        alert("el total de la compra es : $" + total + " \n Gracias por su compra!!");
        break;
    case 2:
        total = creditoSantander(total)
        alert("total con descuento del 15% por pago con tarjeta Santander: $ " + total + " \n Gracias por su compra!!");
        break;
    case 3:
        total = creditoCencosud(total);
        alert("total con descuento por pago con tarjeta Cencosud : $ " + total + " \n Gracias por su compra!!")
        break;
    default:
        break;
}