<?php
  include('../database.php');

  if(isset($_POST['nameTask'])) {
    $name = $_POST['nameTask'];
    $description = $_POST['descriptionTask'];
    $id = $_POST['id'];
    $q = "UPDATE TASK SET nameTask = '$name', descriptionTask = '$description' WHERE id = '$id'";
    $result = mysqli_query($connection, $q);

    if(!$result) {
      die('Query error: ' . mysqli_error($connection));
    }
    echo "Tarea editada con éxito";
  }
?>