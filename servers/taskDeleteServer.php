<?php
  include('../database.php');

  if(isset($_POST['idTask'])) {
    $id = $_POST['idTask'];
    $q = "DELETE FROM TASK WHERE id = '$id'";
    $result = mysqli_query($connection, $q);

    if(!$result) {
      die('Query error: ' . mysqli_error($connection));
    }
    echo 'Tarea eliminada con éxito';
  }
?>