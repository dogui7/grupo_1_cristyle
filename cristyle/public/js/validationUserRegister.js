window.onload=function(){

let form = document.querySelector(".registerForm");

form.addEventListener("submit", function(event){

    let errors = [];

    let firstNameField = document.querySelector("input.firstName");

        if(firstNameField.value == ""){
        errors.push("Debes completar el nombre");
        } 
        else if (firstNameField.value.length < 2 ){
        errors.push("El nombre debe tener al menos 2 caracteres");
        }

    let lastNameField = document.querySelector("input.lastName");

        if(lastNameField.value == ""){
        errors.push("Debes completar el apellido");
        }
        else if(lastNameField.value.length < 2 ){
        errors.push("El apellido debe tener al menos 2 caracteres");
        }

    let emailField = document.querySelector("input.email");

        if(emailField.value == ""){
        errors.push("Debes completar el correo electrónico");
        }

        //cómo pongo que el mail sea formato valido? y que no este ya registrado??

    let passwordField = document.querySelector("input.password");

        if(passwordField.value == ""){
        errors.push("Debes completar la contraseña");
        } 
        else if(passwordField.value.length < 8 ){
            errors.push("La contraseña debe tener al menos 8 caracteres");
            }

    let profileImageField = document.querySelector("input.profileImage");

        if (profileImageField.value.length == 0) {
        errors.push ('Debes subir una imagen de producto');
        }

        let acceptedExtensions = ['jpeg', 'jpg', 'gif', 'png', 'JPEG', 'JPG', 'GIF', 'PNG'];
        let parts = profileImageField.value.split('.');
        let extension = parts[parts.length-1];
        if (!acceptedExtensions.includes(extension)){
        errors.push ('Las extensiones de archivo permitidas son ' + acceptedExtensions.join(', '));
        }


if(errors.length > 0){
   event.preventDefault();
   let ulErrors = document.querySelector(".errors ul");
   ulErrors.innerHTML = "";
   ulErrors.classList.add('error');
   errors.forEach(error => {
       ulErrors.innerHTML += `<li>${error}</li>`
   });

}

})

}
