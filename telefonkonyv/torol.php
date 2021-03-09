<?php

require './MySqlDB.php';

if($_SERVER['REQUEST_METHOD']==="DELETE"){
$mySql=new MySqlDB();
$id=$_GET['ID'];
$mySql->torol("telefonkonyvem","ID=".$id);

$id=$adatom["ID"];
$nev=$adatom["nrv"];
$tel=$adatom["tel"];
$kep=$adatom["kep"];

$updateString="id='".$id."',nev='".$nev."',tel='".$tel."',kep='".$kep."'";
$mySql->frissit("telefonkonyvem",updateString, "ID=".$id);
}