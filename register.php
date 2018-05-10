<!DOCTYPE html>
<?php
session_start();
require_once('connect.php');
if (isset($_POST) & !empty($_POST)) {	
	
	 $nusuario=$_POST["nUsuario"];	
	 $userpassword=$_POST["userPassword"];
	 $sql="SELECT * FROM `usuarios` WHERE nombreusuario='$nusuario' AND password='$userpassword'";
	 //la tabla sin comillas o no funcionara la consulta
	 $consulta=mysqli_query($connection,$sql);	 
	 //si el usuario esta registrado el contador devolvera uno
	 $contador=mysqli_num_rows($consulta);
	 if ($contador==1) {
		 $_SESSION['usuario']=$nusuario;
	 }else{
		 echo "Invalid Username/Password";
	 }
}
if(isset($_SESSION['usuario'])){
	echo "Usuario: ".$_SESSION['usuario']." ya logeado";
}

?>
<html lang="es-ES">

	<head>

		<title>Maqueta Proyecto</title>

		<meta charset="UTF-8">

		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

		<link rel="stylesheet" type="text/css" href="css/reset.css">
        <style>
        div#Registro{
        display:flex;
        flex-direction: column;
        width: 50%;
        margin: 0 auto;
        }
        div#Registro>*{
        padding:5px;
        }
        div#Registro>form{
            display:flex;
            flex-direction: column;
        }
        </style>

	</head>	
    <style>
    #registro{
        display
    }
    </style>

	<body>
      					<div id="pantallaRegistro">

      						<div id="Registro">
								
								<h1>Iniciar sesión</h1>

      							<p>Introduce tus credenciales
      							</p>

      							<form method="POST" action="">

      								<label>Nombre de usuario</label>

      								<input type="text" name="nUsuario" placeholder="nombre de usuario">

      								<label>Nombre</label>

      								<input type="text" name="nombre" placeholder="nombre">

      								<label>Apellidos</label>

      								<input type="text" name="apellidos" placeholder="apellidos">

      								<label>email</label>

      								<input type="text" name="email" placeholder="email">

      								<label>Contraseña</label>

      								<input type="password" name="userPassword">

      								<label>Repita la contraseña</label>

      								<input type="password" name="userPassword">

      								<button type="submit">Registrar<span>></span></button>

      							</form>

      						</div>

      					</div>




		<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDq_lJvM8dDz84x204rDOwjuMIExZnNEac"></script>

		<script type="text/javascript" src="javascript/script.js"></script>

	</body>

</html>