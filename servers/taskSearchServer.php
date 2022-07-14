<?php
  include('../database.php');

  $search = $_POST['search'];
  if(!empty($search)) {
    $q = "SELECT * FROM TASK WHERE nameTask LIKE '$search%'";
    $result = mysqli_query($connection, $q);
    if(!$result) {
      die('Query error: ' . mysqli_error($connection));
    }

    $json = array();
    while($row = mysqli_fetch_array($result)) {
      $json[] = array(
        'id' => $row['id'],
        'nameTask' => $row['nameTask'],
        'descriptionTask' => $row['descriptionTask'],
      );
    }

    $jsonString = json_encode($json);
    echo $jsonString;
  }
?>