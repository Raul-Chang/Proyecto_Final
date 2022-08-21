// Metodo reduce para generar las tarjetas

let tarjetasHtml
const contenedorTarjetas = document.querySelector(".contenedor-tarjetas")
let listaProductos = []
let btnAgregar
let divCarro = document.querySelector("#carro")
let seccionCarroCompra = document.querySelector("#seccion-carro-compra")
let vaciar = document.querySelector("#vaciar")


let listadoProductos2 = () => {

    fetch(`productos.json`)
    .then( resp => resp.json())
    .then( data => {
        listaProductos = data.listaProductos
        tarjetas(listaProductos)        
        contenedorTarjetas.innerHTML = tarjetasHtml
        btnAgregar = document.querySelectorAll(".btnAgregar")        
        fondoTarjeta()        
        mostrarCarro()         
        for (btn of btnAgregar) {        
            btn.addEventListener("click", agregarAlCarro)}      

    })
    .catch( () => console.log("salio mal"))
}

listadoProductos2()

function tarjetas (productos){
    tarjetasHtml = productos.reduce((acc, elemento) => {   

        return acc = acc + `    
            <div class="tarjeta">
                <div class="img-container">
                    <img src=${elemento.img} alt=${elemento.description}>
                </div>   
                <p class="p-tarjeta">
                    ${elemento.description}
                </p>             
                <p class="p-tarjeta">
                    Precio: $${elemento.price}
                </p>
                <button class="btnAgregar" id="${elemento.id}">Agregar a Compra</button>              
            </div>
        `       
    },"")
}

//Recepcion de valores por formulario para generar un saludo al cliente

const formularioSaludo = document.querySelector(".nombre-saludo")
const inputNombreSaludo = document.querySelector(".input-nombre")
const saludo = document.querySelector(".saludo")
let idplus = listaProductos.map((el) => el.id)

//Uso de spread en el saludo

formularioSaludo.onsubmit = (event) => {
    event.preventDefault()
    saludo.innerHTML = `
    <h2>Hola ${inputNombreSaludo.value} te muestro el listado de productos de la tienda:</h2>
    <h3 class="saludoh3">Actualmente tenemos ${Math.max(...idplus)} productos en nuestro catálogo</h3>
    `
    formularioSaludo.reset()
    formularioSaludo.style.display = "none";
}

//Cambiando el color de fondo y el tama;o del texto al mover el mouse sobre las tarjetas de productos

function fondoTarjeta() {
    const divTarjeta = [document.querySelectorAll(".tarjeta")]

    divTarjeta[0].forEach( function (ele , i, arreglo) {
        ele.onmouseover = () => {    
        ele.classList.toggle("tarjeta-over")        
    } 
        ele.onmouseout = () => {
        ele.classList.toggle("tarjeta-over") 
    }
})
}
// Funcion para Agregar productos al carro de compras

function agregarAlCarro(e) {    
    divCarro.innerHTML = ""
    const btn = e.target;
    const idBtn = btn.getAttribute("id");
    let productoAgregado = listaProductos.find(productos => productos.id === idBtn)
    carro.push(productoAgregado) 
    
    localStorage.setItem("carro", JSON.stringify(carro))    

    swal("Agregaste " + productoAgregado.description + " al carro de compras", "Gracias por escogernos", "success")
    Toastify({
        text: "Acción Exitosa",
        close: true,
        duration: 3000
    }).showToast()
    mostrarCarro()
}

// function clickAgregar () {       
//     for (btn of btnAgregar) {        
//         btn.addEventListener("click", agregarAlCarro)}

// }

// Mostrar Carro

//Uso del operador OR
let carro = JSON.parse(localStorage.getItem("carro")) || []

function mostrarCarro(){
    divCarro.innerHTML = ""
    carro.forEach(listaProductos => {
        divCarro.innerHTML += `
        <div class="productoCarro">
            <img src=${listaProductos.img}>
            
            <p class="p-carro"> ${listaProductos.description}  $${listaProductos.price} </p>
            <button class="btnBorrar" id="${listaProductos.id}"> X </button>
        </div>
        `
    })
    let total = carro.reduce((acc, p) => acc+p.price, 0)
    let totalCompra = document.createElement("p")
    totalCompra.setAttribute("class", "total")
    totalCompra.innerText = ("Total : " + total)
    localStorage.setItem("total", total)

    divCarro.append(totalCompra)

    let btnBorrar = document.querySelectorAll(".btnBorrar")

    for (btnX of btnBorrar){
        btnX.addEventListener("click", eliminarProducto)
    }

    //Vaciar Carro
    vaciar.addEventListener("click", () => {
        carro = [];
        localStorage.clear();
        divCarro.innerHTML = "";
    })
    let finalizarCompra = document.createElement("button")
    finalizarCompra.setAttribute("class", "finalizarCompra")
    finalizarCompra.innerHTML = ("Finalizar Compra")
    divCarro.append(finalizarCompra)

    finalizarCompra.addEventListener("click", () => {
        window.location.href="pages/compra.html"
    })
}

//Uso del operador AND
carro.length && mostrarCarro()

// Eliminar Producto

function eliminarProducto(e) {
    divCarro.innerHTML = ""
    let btnX = e.target;
    let idBtnX = btnX.getAttribute("id");    
    let indexProducto = carro.findIndex(productos =>  productos.id === idBtnX) 
    swal("Eliminaste " + carro[indexProducto].description + " del carro de compras","Necesitas algo más? Revisa nuestro catálogo", "info")   
    carro.splice(indexProducto, 1)
    localStorage.removeItem("carro")
    localStorage.setItem("carro", JSON.stringify(carro));
    Toastify({
        text: "Acción Exitosa",
        close: true,
        duration: 3000
    }).showToast()
    
    mostrarCarro(carro)
}









