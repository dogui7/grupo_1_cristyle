window.onload=function(){
    let form = document.querySelector('#formularioLogin');
  
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
      let {email,password} = form.elements
      
      // Checkeamos en funciones individuales cada campo
      if (!validateName(email)) return false;
      if (!validateImage(password)) return false;
      return true;
    }
  
    // Comento esta función, el resto son similares solo que cambia qué se verifica.
    function validateName(email) {
      // En la vista hay un elemento <p> al final de cada campo, donde se pondrán los errores. Lo guardamos en la variable error
      let error = document.getElementById('emailErrorJs');
      // Le ponemos la clase "error" por defecto
      error.classList.add('error');
  
      // Si no se escribió email
      if (email.value.length == 0) {
        error.innerHTML = 'Debes completar el email del usuario';
        return false;
      }
  
      // Si el email no tiene al menos 5 caracteres
      if (email.value.length < 5){
        error.innerHTML = 'El email debe tener al menos 5 caracteres';
        email.focus();
        return false;
      } 
  
      // En el caso de que no haya errores, borramos lo que tenga escrito y le quitamos la clase "error"
      error.innerHTML = '';
      error.classList.remove('error');
      return true;
    }
  
    function validateImage(password) {
      let error = document.getElementById('passwordErrorJs');
      error.classList.add('error');
  
      // Si no se completa la contraseña
      if (password.value.length == 0) {
        error.innerHTML = 'Debe completar la contraseña';
        return false;
      }
      
      if (password.value.length < 8) {
        error.innerHTML = 'La contraseña debe contener al menos 8 caracteres';
        return false;
      }
    
  
      error.innerHTML = "";
      error.classList.remove('error');
      return true;   
    }
  
};