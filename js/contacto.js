let nombreConsulta = document.querySelector("#nombre-consulta")
let emailConsulta = document.querySelector("#email-consulta")
let textConsulta = document.querySelector("#consulta")
let formConsulta = document.querySelector(".sectionc__form")
let respConsulta = document.querySelector(".sectionc__divForm")

formConsulta.onsubmit = (e) => {
    e.preventDefault()
    formConsulta.style.display = "none"
    respConsulta.innerHTML= `
    <p class="respuesta-contacto">${nombreConsulta.value.toUpperCase()} gracias por comunicarte con nosotros</p>
    <p class="respuesta-contacto">En un tiempo de hasta 48 horas nos estaremos comunicando al mail: ${emailConsulta.value}</p>`

}