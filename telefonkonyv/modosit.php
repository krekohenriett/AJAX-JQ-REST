<?php

require './MySqlDB.php';

parse_str(file_get_contents('php://input'), $adatom);
print_r($adatom);
$mySql=new MySqlDB();

