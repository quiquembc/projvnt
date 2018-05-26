<!DOCTYPE html>
<?php
session_start();
require_once('connect.php');
if (isset($_POST) & !empty($_POST)) {
	
	
	 $nusuario=$_POST["nUsuario"];	
	 $userpassword=md5($_POST["userPassword"]);
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

	</head>	

	<body>

		<div id="wrapper">

			<header id="header">
					
				<div id="logo">

					<span></span>

					<p>Actividades culturales y de ocio municipal</p>

				</div>
				
				<div id="sesion">

					<input type="checkbox" id="iSesion">

      					<label for="iSesion">
      						<span></span>
							  <?php
							  if(isset($_SESSION['usuario'])){
								echo "Bienvenido: ".$_SESSION['usuario'];
								}
								else {
									echo "Iniciar sesion";
								}?>
      					</label>

      					<div id="pantallaSesion">

      						<div id="inicioSesion">
								
								<h1>Iniciar sesión</h1>

      							<p>Introduce tus credenciales
      							</p>

      							<form method="POST" action="">

      								<label>Nombre de usuario</label>

      								<input type="text" name="nUsuario" placeholder="nombre de usuario">

      								<label>Contraseña</label>

      								<input type="password" name="userPassword">

      								<button type="submit">Conectar<span>></span></button>

      								<p>¿Aún no tienes cuenta? <a href="#">Regístrate</a></p>

      							</form>

      						</div>

      					</div>


				</div>

            </header>

            </div>

		<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDq_lJvM8dDz84x204rDOwjuMIExZnNEac"></script>

		<script type="text/javascript" src="javascript/script.js"></script>

	</body>

</html>