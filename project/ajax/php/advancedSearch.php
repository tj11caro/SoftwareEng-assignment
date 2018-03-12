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
    $query     = "Select * from TESTTABLE1 where DONOR_FIRST_NAME = '$Fname'"; 
    $rows=array();
    
    $result=mysqli_query($mysqli, $query);
    while($r= mysqli_fetch_assoc($result)){
        $rows[]=$r;
    }
    print json_encode($rows);
}
?>
