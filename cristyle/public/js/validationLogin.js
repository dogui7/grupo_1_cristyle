/* const formulario = this.document.getElementById('formularioLogin');

const inputs = this.document.querySelectorAll ('#formularioLogin input');

const expresiones = {
    password: /^.{8,20}$/, 
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};


const validarFormulario = (e) => {
    switch (e.target.name) {
        case "email":
            if (expresiones.correo.test(e.target.value)){
                document.querySelector ('.campo-texto label').classList.remove ('campo-texto-error ');
            } else {
                document.querySelector ('.campo-texto label').classList.add ('campo-texto-error ');
            }
        break;

        case "password":

        break;
    }  
}

inputs.forEach ((input)=> {
    input.addEventListener ('keyup' , validarFormulario)
    input.addEventListener ('blur' , validarFormulario)
});

formulario.addEventListener ('submit', (e) => {
    e.preventDefault();
});

 */