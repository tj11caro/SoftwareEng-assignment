<?php
// The mysql database connection script
require_once 'connect_to_perm_team1_2017.php'; 
//This decodes json data provided by controller
$info = json_decode(file_get_contents("php://input"));
//echo json_encode($info);
//echo "console.log($info->query)";
if (count($info) > 0) {    
//    $query     = mysqli_real_escape_string($mysqli, $info->query);
    $Fname     = mysqli_real_escape_string($mysqli, $info->Fname);
    $Lname     = mysqli_real_escape_string($mysqli, $info->Lname);
    $Mname     = mysqli_real_escape_string($mysqli, $info->Mname);
    $GradYear     = mysqli_real_escape_string($mysqli, $info->GradYear);
  //  $Minor     = mysqli_real_escape_string($mysqli, $info->Minor);
  //  $Major     = mysqli_real_escape_string($mysqli, $info->Major);
  //  $Club     = mysqli_real_escape_string($mysqli, $info->Club);
    $City     = mysqli_real_escape_string($mysqli, $info->City);
    $query     = newQuery;
    $rows=array();
    
    $result=mysqli_query($mysqli, $query);
    while($r= mysqli_fetch_assoc($result)){
        $rows[]=$r;
    }
    print json_encode($rows);
}
?>
