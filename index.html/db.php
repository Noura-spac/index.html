<?php 
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "myfinal_project";

$conn = new mysqli($host , $user , $pass , $dbname);

if ($conn ->connect_error){
 die ("connection failled:" . $conn->connect_error);
}
echo "database connected succssfuiily";