// ===== Scroll to Top ==== 
$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) { // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200); // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200); // Else fade out the arrow
    }
});
$('#return-to-top').click(function () { // When arrow is clicked
    $('body,html').animate({
        scrollTop: 0 // Scroll to top of body
    }, 500);
});
// ===== fin Scroll to Top ==== 

// ===== TOTAL A PAGAR==== 
function compraTotal(productosStorage) {
    acumulador = 0;
    productosStorage.forEach((productoCarrito) => {
        acumulador += productoCarrito.precio * productoCarrito.cant
    })

    if (acumulador == 0) {
        parrafoCompra.innerHTML = ""
        modalBody.innerHTML = "<p>Lo siento, tu carrito está vacío :(</p>"
    } else {
        parrafoCompra.innerHTML = `<b class="total">Total a pagar: $${new Intl.NumberFormat("de-DE").format(acumulador)}</b>`
    }

}

function cargarEventosModal(productosStorage) {

    productosStorage.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${indice}`).addEventListener('click', () => {

            document.getElementById(`productoCarrito${indice}`).remove()
            productos.splice(indice, 1)
            localStorage.setItem('carrito', JSON.stringify(productos))
            cargarCarritoModal(JSON.parse(localStorage.getItem('carrito')))
        })
    })

    productosStorage.forEach((productoCarrito, indice) => {
        document.getElementById(`sum${indice}`).addEventListener('click', () => {
            if (productos[indice].cant < productos[indice].stock) {
                productos[indice].cant++
                localStorage.setItem('carrito', JSON.stringify(productos))
                cargarCarritoModal(JSON.parse(localStorage.getItem('carrito')))
            }
        })
    })

    productosStorage.forEach((productoCarrito, indice) => {
        document.getElementById(`rest${indice}`).addEventListener('click', () => {
            if (productos[indice].cant > 1) {
                productos[indice].cant--
                localStorage.setItem('carrito', JSON.stringify(productos))
                cargarCarritoModal(JSON.parse(localStorage.getItem('carrito')))
            }
        })
    })

}

function cargarCarritoModal(productosStorage) {
    modalBody.innerHTML = " "
    productosStorage.forEach((productoCarrito, indice) => {

        modalBody.innerHTML += `
            <div class="card border-primary mb-3" id ="productoCarrito${indice}" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="./img/${productoCarrito.img}" class="img-fluid rounded-start" alt="...">
                </div>
            <div class="col-md-8">
                <div class="card-body">
               
                <h5 class="card-title">${productoCarrito.nombre}</h5>
                <div class="row cantidad-modal">
                    <p class="card-text">Cantidad: ${productoCarrito.cant}</p>
                    <button class="btn btn-outline-secondary" id="sum${indice}"><i class="fas fa-plus"></i></button>
                    <button class="btn btn-outline-secondary" id="rest${indice}"><i class="fas fa-minus"></i></button> 
                </div>
                <p class="card-text">Precio: $${new Intl.NumberFormat("de-DE").format(productoCarrito.precio * productoCarrito.cant)}</p> 
                <button class= "btn btn-danger" id="botonEliminar${indice}">Eliminar <i class="fas fa-trash-alt"></i></button>
            </div>
            </div>
            </div>
        </div>
    `
    })
    cargarEventosModal(productosStorage)
    compraTotal(productosStorage)
}

botonCarrito.addEventListener('click', () => {
    let productosStorage = JSON.parse(localStorage.getItem('carrito'))
    cargarCarritoModal(productosStorage)
})

// Gracias por tu compra!
botonFinalizar.addEventListener('click', (event) => {
    let productosStorage = JSON.parse(localStorage.getItem('carrito'))
    if (productosStorage.length === 0) {
        return;
    }
    

    localStorage.setItem('carrito', JSON.stringify([]))
    swal("¡Gracias por su compra!", "Los productos serán enviados a la brevedad", "success");
})
