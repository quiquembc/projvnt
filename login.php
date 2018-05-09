<!DOCTYPE html>
<?php
require_once('connect.php');
print_r($_POST);
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
      						Iniciar sesión
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