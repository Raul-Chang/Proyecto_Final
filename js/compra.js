let carroCompra = JSON.parse(localStorage.getItem("carro")) || []
let resumenCompra = document.querySelector("#resumen")
let totalCompra = document.querySelector(".total-compra")
let total = localStorage.getItem("total")

function resumenCarroCompra() {
    carroCompra.map(producto => {
        resumenCompra.innerHTML += `
        <div class="detalleProd">
        <img src="../${producto.img}"/>
        <div class="resumenp">
        <p>${producto.description}</p>
        <p>$${producto.price}</p>
        </div>
        <button class="btnBorrar" id="${producto.id}">X</button>
        </div>`
    })

    totalCompra.innerHTML = `Total de la Compra es: ${total}`


    let btnBorrar = document.querySelectorAll(".btnBorrar")

    for (btnX of btnBorrar){
        btnX.addEventListener("click", eliminarProducto)
    }
}

// Uso del operador terniario
// el carrito tiene productos ? si tiene, mostrarlos : si no tiene mostrar mensaje
carroCompra.length ? resumenCarroCompra() : (resumenCompra.innerHTML=`<h3 class="noproductosh">No hay productos en su carro de compra</h3>`)

//FORMULARIO
let nombre = document.querySelector("#nombre")
let mail = document.querySelector("#mail")
let telefono = document.querySelector("#telefono")
let direccion = document.querySelector("#direccion")
let divConfirmacion = document.querySelector("#confirmacion")
let submit = document.querySelector("#submit")
let formulario = document.querySelector("#form")

function terminarCompra() {

    if (nombre.value !== "" && mail.value !== "" && telefono.value !== "" && direccion.value !== "") {
        swal("Ha completado exitosamente su compra", "Gracias por escogernos", "success")
        formulario.style.display = "none"
        divConfirmacion.style.display = "flex"
        divConfirmacion.innerHTML = `
<h3>Gracias por tu compra ${nombre.value}!</h3>
<p>Le estaremos enviando un mail a ${mail.value} con su factura de compra</p>
<p>Su entrega será realizada en un plazo de entre 48 y 72 horas a la direccion: ${direccion.value}</p>
<p>Recibirá una llamada al numero ${telefono.value} cuando el pedido vaya en camino</p>
<p>Un placer atenderle, siempre puede volver a xChocostorex</p>
`
    } else {
        divConfirmacion.innerHTML = `
        <h3>Por favor complete todos los campos</h3>`
    }
}

formulario.onsubmit = (e) => {
    e.preventDefault()
    if(carroCompra.length>0){
        terminarCompra()
    } else {
        swal("No ha ingresado productos a su carro de compras","Por favor revise su compra","warning")
    }
    
    formulario.reset()
}

function eliminarProducto(e) {
    resumenCompra.innerHTML = ""
    let btnX = e.target;
    let idBtnX = btnX.getAttribute("id");      
    let indexProducto = carroCompra.findIndex(productos =>  productos.id === idBtnX)     
     swal("Eliminaste " + carroCompra[indexProducto].description + " del carro de compras","Necesitas algo más? Revisa nuestro catálogo", "info")   
     Toastify({
        text: "Acción Exitosa",
        close: true,
        duration: 3000
    }).showToast()
     carroCompra.splice(indexProducto, 1)
    localStorage.removeItem("carro")
    localStorage.setItem("carro", JSON.stringify(carroCompra));
    total = carroCompra.reduce((acc, p) => acc+p.price, 0)
    localStorage.setItem("total", total)
    totalCompra.innerHTML = `Total de la Compra es: ${total}`
    if(carroCompra.length==0){
        resumenCompra.innerHTML=`<h3 class="noproductosh">No hay productos en su carro de compra</h3>`
        swal("Ha eliminado todos los productos de su carro de compra")
    }
            
    resumenCarroCompra(carroCompra)
    
 }