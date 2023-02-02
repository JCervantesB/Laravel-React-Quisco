<!DOCTYPE html>
<html>
<head>
    <title>Recuperación de Contraseña</title>
</head>
<body>
    <h1>Hola {{$nombre}}!</h1>
    <p>Has solicitado reestablecer tu contraseña en FreshCoffee</p>
    <p>Para hacerlo, por favor haz clic en el siguiente enlace:</p>
    <a href="{{ env('FRONTEND_URL') }}/auth/recuperar?token={{ $token }}">{{ env('FRONTEND_URL') }}/auth/recuperar?token={{ $token }}</a>
    <p>Gracias!</p>
</body>
</html>