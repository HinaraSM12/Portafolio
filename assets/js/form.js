document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const nombreInput = document.getElementById('name');
    const correoInput = document.getElementById('email');
    const asuntoInput = document.getElementById('subject');
    const mensajeTextarea = document.getElementById('message');
  
    const errorNombre = document.getElementById('error-nombre');
    const errorCorreo = document.getElementById('error-correo');
    const errorAsunto= document.getElementById('error-asunto');
    const errorMensaje = document.getElementById('error-mensaje');
  
    form.addEventListener('submit', (event) => {
        event.preventDefault();
  
        let valid = true;
  
        // Validación del nombre
        if (nombreInput.value.trim() === '') {
            valid = false;
            errorNombre.textContent = 'El nombre no puede estar vacío.';
        } else if (nombreInput.value.length > 50) {
            valid = false;
            errorNombre.textContent = 'El nombre no puede tener más de 50 caracteres.';
        } else {
            errorNombre.textContent = '';
        }
        
        // Validación del correo
        const re = /\S+@\S+\.\S+/
        if (correoInput.value.trim() === '') {
            valid = false;
            errorCorreo.textContent = 'El correo electrónico no puede estar vacío.';
        } else if (!re.test(correoInput.value.trim())){ 
            errorCorreo.textContent = 'Por favor, introduzca un correo electrónico válido.';
            valid = false;
        } else {
            errorCorreo.textContent = '';
        }
  
          // Validación del asunto
        if (asuntoInput.value.trim() === '') {
            valid = false;
            errorAsunto.textContent = 'El asunto no puede estar vacío.';
        } else if (asuntoInput.value.length > 50) {
            valid = false;
            errorAsunto.textContent = 'El asunto no puede tener más de 50 caracteres.';
        } else {
          errorAsunto.textContent = '';
        }
  
  
        // Validación del mensaje
        if (mensajeTextarea.value.trim() === '') {
            valid = false;
            errorMensaje.textContent = 'El mensaje no puede estar vacío.';
        } else if (mensajeTextarea.value.length > 300) {
            valid = false;
            errorMensaje.textContent = 'El mensaje no puede tener más de 300 caracteres.';
        } else {
            errorMensaje.textContent = '';
        }
  
        // Si el formulario es válido, enviar el formulario
        if (valid) {
            alert('Mensaje enviado correctamente.');
            form.reset();
            // Aquí puedes añadir la lógica para enviar el formulario
            // form.submit(); // Descomentar esta línea si se desea enviar el formulario
        }
    });
  });