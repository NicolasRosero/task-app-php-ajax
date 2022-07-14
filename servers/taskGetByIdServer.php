<?php
  include('../database.php');

  if(isset($_POST['idTask'])) {
    $id = $_POST['idTask'];
    $q = "SELECT * FROM TASK WHERE id = '$id'";
    $result = mysqli_query($connection, $q);

    if(!$result) {
      die('Query error: ' . mysqli_error($connection));
    }
    
    $json = array();
    while($row = mysqli_fetch_array($result)) {
      $json[] = array(
        'id' => $row['id'],
        'nameTask' => $row['nameTask'],
        'descriptionTask' => $row['descriptionTask']
      );
    }
    $jsonString = json_encode($json);
    echo $jsonString;
  }
?>