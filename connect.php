<?php  
$connection = mysqli_connect('localhost', 'event', '3venT');
if(!$connection){
    die("Fallo de conexion con la base de datos" . mysqli_error($connection));
}
$select_db = mysqli_select_db($connection, 'eventos');
if(!$select_db){
    die("Fallo de seleccion de la base de datos" . mysqli_error($connection));
}
?>