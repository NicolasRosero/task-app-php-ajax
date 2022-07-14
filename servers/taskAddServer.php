<?php
  include('../database.php');

  if(isset($_POST['nameTask'])) {    
    $name = $_POST['nameTask'];
    $description = $_POST['descriptionTask'];
    $q = "INSERT INTO TASK(nameTask, descriptionTask) VALUES ('$name', '$description')";
    $result = mysqli_query($connection, $q);

    if(!$result) {
      die('Query error: ' . mysqli_error($connection));
    }
    echo 'Tarea agregada con éxito';
  }
?>