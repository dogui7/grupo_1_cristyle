window.onload=function(){

    let form = document.querySelector(".formEdit");

    form.addEventListener("submit", function(event){

        let errors = [];
      
        let nameField = document.querySelector("#name");
    
            if(nameField.value == ""){
            errors.push("Debes completar el nombre del producto");
            } 
            else if (nameField.value.length < 5 ){
            errors.push("El nombre debe tener al menos 5 caracteres");
            }
    
        let descriptionField = document.querySelector("#description");
    
            if(descriptionField.value.length < 20 ){
            errors.push("La descripción debe tener al menos 20 caracteres");
            }

        let imageField = document.querySelector(".form-image");

            let acceptedExtensions = ["jpeg", "jpg", "gif", "png", "JPEG", "JPG", "GIF", "PNG"];
            let parts = imageField.value.split(".");
            let extension = parts[parts.length-1];
            if (!acceptedExtensions.includes(extension)){
            errors.push("Las extensiones de archivo permitidas son " + acceptedExtensions.join(", "));
            }

    
    if(errors.length > 0){
       event.preventDefault();
       let ulErrors = document.querySelector(".errors ul");
       ulErrors.innerHTML = "";
       ulErrors.classList.add("error");
       errors.forEach(error => {
           ulErrors.innerHTML += `<li>${error}</li>`
       });
    }
    
    })
    
    }
    