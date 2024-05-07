<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si se han enviado los datos del formulario
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Configurar el correo electrónico
    $to = "tu@email.com";
    $subject = "Nuevo mensaje de contacto: " . $subject;
    $message = "Nombre: $name\nCorreo: $email\nMensaje:\n$message";

    // Enviar el correo electrónico
    $headers = "From: $email";

    if (mail($to, $subject, $message, $headers)) {
        echo "OK"; // Enviar respuesta de éxito al formulario
    } else {
        echo "Error al enviar el mensaje"; // Enviar respuesta de error al formulario
    }
} else {
    echo "Acceso no permitido"; // Enviar respuesta si se intenta acceder directamente al archivo
}
?>
