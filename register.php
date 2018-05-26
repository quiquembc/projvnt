<!DOCTYPE html>
<?php
session_start();
require_once('connect.php');
if (isset($_POST) & !empty($_POST)) {	
	print_r($_POST);
	 $nombreusuario=$_POST["nombreusuario"];	
	 $nombre=$_POST["nombre"];	
	 $apellidos=$_POST["apellidos"];	
	 $email=$_POST["email"];	
	 $distrito=$_POST["distrito"];	
	 $userpassword1=$_POST["password1"];
	 $userpassword2=$_POST["password2"];
	 if ($userpassword1==$userpassword2){
		 $userpassword1=md5($_POST["password1"]);
	$sql="INSERT INTO `usuarios` (nombreusuario,password,nombre,apellidos,email) VALUES ('$nombreusuario','$userpassword1','$nombre','$apellidos','$email') ";
	 $insercion=mysqli_query($connection,$sql);	 
	 if($insercion){
		 echo "El registro ha sido satisfactorio";
	 } else {
		 echo "El registro ha fallado miserablemente";
	 }
	 //si el usuario esta registrado el contador devolvera uno
	 //$contador=mysqli_num_rows($consulta);
	 }
	 else{
		 echo "Las contraseñas no coinciden";
	 }
}
?>
<html lang="es-ES">

	<head>

		<title>Registro</title>

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
        div#Registro *{
        margin:5px;
        }
        div#Registro>form{
		display:flex;
		flex-direction: column;
        }
        </style>
	</head>	
	<body>
      					<div id="pantallaRegistro">

      						<div id="Registro">
								
								<h1>Iniciar sesión</h1>

      							<p>Introduce tus credenciales
      							</p>

      							<form method="POST" action="">

      								<label>Nombre de usuario</label>

      								<input type="text" name="nombreusuario" placeholder="nombre de usuario">

      								<label>Nombre</label>

      								<input type="text" name="nombre" placeholder="nombre">

      								<label>Apellidos</label>

      								<input type="text" name="apellidos" placeholder="apellidos">

      								<label>email</label>

      								<input type="text" name="email" placeholder="email">

      								<label>Contraseña</label>

      								<input type="password" name="password1">

      								<label>Confirma la contraseña</label>

      								<input type="password" name="password2">

									<label>Selecciona tu distrito</label>

									<select name="distrito">

										<option value="arganzuela">arganzuela</option>

										<option value="saab">Saab</option>

										<option value="mercedes">Mercedes</option>

										<option value="audi">Audi</option>

									</select>

      								<button type="submit">Registrar<span>></span></button>

      							</form>

      						</div>

      					</div>

		<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDq_lJvM8dDz84x204rDOwjuMIExZnNEac"></script>

		<script type="text/javascript" src="javascript/script.js"></script>

	</body>

</html>