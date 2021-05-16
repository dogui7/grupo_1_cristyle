window.onload=function(){
  let form = document.querySelector('#form-create');

  form.onsubmit = function(evento) {
    // Si hay errores, evitamos mandar el formulario. Caso contrario se envía
    if (!validateRegisterForm()) {
      evento.preventDefault()
    }else{
      fomulario.submit()
    }
  }

  function validateRegisterForm() {
    // Con destructuring separamos el formulario en variables individuales
    let { name, price, discount, categoryId, sizeId, image, gender, description} = form.elements
    
    // Checkeamos en funciones individuales cada campo
    if (!validateName(name)) return false;
    if (!validateImage(image)) return false;
    if (!validateDescription(description)) return false;
    return true;
  }

  // Comento esta función, el resto son similares solo que cambia qué se verifica.
  function validateName(name) {
    // En la vista hay un elemento <p> al final de cada campo, donde se pondrán los errores. Lo guardamos en la variable error
    let error = document.getElementById('nameErrorJs');
    // Le ponemos la clase "error" por defecto
    error.classList.add('error');

    // Si no se escribió nombre
    if (name.value.length == 0) {
      error.innerHTML = 'Debes completar el nombre del producto';
      return false;
    }

    // Si el nombre no tiene al menos 5 caracteres
    if (name.value.length < 5){
      error.innerHTML = 'El nombre del producto debe tener al menos 5 caracteres';
      name.focus();
      return false;
    } 

    // En el caso de que no haya errores, borramos lo que tenga escrito y le quitamos la clase "error"
    error.innerHTML = '';
    error.classList.remove('error');
    return true;
  }

  function validateImage(image) {
    let error = document.getElementById('imageErrorJs');
    error.classList.add('error');

    // Si no se subio un archivo
    if (image.value.length == 0) {
      error.innerHTML = 'Debes subir una imagen de producto';
      return false;
    }

    // Si no tiene una extensión permitida
    let acceptedExtensions = ['jpeg', 'jpg', 'gif', 'png', 'JPEG', 'JPG', 'GIF', 'PNG'];
    let parts = image.value.split('.');
    let extension = parts[parts.length-1];
    if (!acceptedExtensions.includes(extension)){
      error.innerHTML = 'Las extensiones de archivo permitidas son ' + acceptedExtensions.join(', ');
      return false;
    }

    error.innerHTML = "";
    error.classList.remove('error');
    return true;   
  }

  function validateDescription(description) {
    let error = document.getElementById('descriptionErrorJs');
    error.classList.add('error');

    // Si no se escribió una descripción
    if (description.value.length == 0) {
      error.innerHTML = 'Debes completar la descripción del producto';
      return false;
}
    
    // Si la descripción no tiene al menos 20 caracteres
    if (description.value.length < 20){
      error.innerHTML = 'La descripción del producto debe tener al menos 20 caracteres';
      description.focus();
      return false;
    }

    error.innerHTML = '';
    error.classList.remove('error');
    return true;   
  }
}