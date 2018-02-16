<?php
// The mysql database connection script
require_once 'connect_to_perm_team1_2017.php'; 
//This decodes json data provided by controller
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {    
    $pidm     = mysqli_real_escape_string($mysqli, $info->pidm);
    $user     = mysqli_real_escape_string($mysqli, $info->user);
    
        $query = "UPDATE TESTTABLE1 SET AF_ASSIGNED_USER = '$user' WHERE PIDM_KEY = '$pidm'";
        if (mysqli_query($mysqli, $query)) {
            echo 'Data Updated Successfully...';
        } else {
            echo 'Failed';
        }   
}
?>
