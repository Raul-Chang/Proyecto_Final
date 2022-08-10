let nombreConsulta = document.querySelector("#nombre-consulta")
let emailConsulta = document.querySelector("#email-consulta")
let textConsulta = document.querySelector("#consulta")
let formConsulta = document.querySelector(".sectionc__form")
let respConsulta = document.querySelector(".sectionc__divForm")
// const clientesConsultas = []

class ClienteConsultas {
    constructor(nombre, email, consulta){
        this.nombre = nombre;
        this.email = email;        
        this.consulta = consulta;
        
    }
}


formConsulta.onsubmit = (e) => {
    e.preventDefault()

    //Uso de destructuracion
    let clientesConsultas = new ClienteConsultas(nombreConsulta.value, emailConsulta.value, textConsulta.value)    
    let {nombre, email} = clientesConsultas
    formConsulta.style.display = "none"
    respConsulta.innerHTML= `
    <p class="respuesta-contacto">${nombre.toUpperCase()} gracias por comunicarte con nosotros</p>
    <p class="respuesta-contacto">En un tiempo de hasta 48 horas nos estaremos comunicando al mail: ${email}</p>`

}