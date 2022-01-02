//Obtener elemento por Id: getElementById()
let title = document.getElementById("title")


// Modo claro y escuto
//1. inicializamos darkMode:
let darkMode;

if (localStorage.getItem("blackMode")) {
    darkMode = localStorage.getItem("blackMode");

} else {
    darkMode = "light"
}
localStorage.setItem("blackMode", darkMode)

$(() => {
    if (localStorage.getItem("blackMode") == "dark") {
        $("body").addClass("blackMode")
        $("#btnDarkMode").hide()
        $("#btnLightMode").show()

    } else {
        $("#btnLightMode").hide()
    }
    $("#btnLightMode").click(() => {
        $("#btnLightMode").hide()
        $("#btnDarkMode").show()

        $("body").removeClass("blackMode")
        localStorage.setItem("blackMode", "light")
    })

    $("#btnDarkMode").click(() => {
        $("#btnLightMode").show()
        $("#btnDarkMode").hide()


        $("body").addClass("blackMode")
        localStorage.setItem("blackMode", "dark")
    })

})
//-------

//PRODUCTOS
localStorage.setItem('carrito', JSON.stringify([]))
let divProductos = document.getElementById("divProductos")
let botonCarrito = document.getElementById("botonCarrito")
let modalBody = document.getElementById("modal-body")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let parrafoCompra = document.getElementById('precioTotal')
let acumulador;

fetch('productos.json')
    .then(response => response.json())
    .then(dataProductos => {
        dataProductos.forEach((productoEnArray, indice) => {

            divProductos.innerHTML += `
               <div class="card border-primary mb-3" id="producto${indice}" style="max-width: 20rem; margin:8px">
                   <img src="./img/${productoEnArray.img}" class="card-img-top" alt="producto">
                   <div class="card-body">
                       <h4 class="card-title">Cuadro ${productoEnArray.nombre}</h4>
                       <p class="card-text">Medidas: ${productoEnArray.medidas}</p>
                       <p class="card-text">$${productoEnArray.precio}</p>
                       <button id="boton${indice}" class="btn btn-primary "> AGREGAR AL CARRO </button>
                   </div>
               </div>
               
              `
        });

        dataProductos.forEach((productoEnArray, indice) => {
            document.getElementById(`boton${indice}`).addEventListener('click', () => {
                if (productos.find(producto => producto.nombre == productoEnArray.nombre)) {
                    let index = productos.findIndex(producto => producto.nombre == productoEnArray.nombre)
                    productos[index].cant++
                    localStorage.setItem('carrito', JSON.stringify(productos))
                } else {
                    let nuevoProducto = new Producto(productoEnArray.nombre, productoEnArray.medidas,
                        productoEnArray.precio, productoEnArray.img)
                    productos.push(nuevoProducto)
                    localStorage.setItem('carrito', JSON.stringify(productos))
                }

            })
        })
    })