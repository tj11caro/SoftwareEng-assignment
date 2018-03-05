<?php 
require_once 'connect_to_perm_team1_2017.php'; 
    $query="SELECT PIDM_KEY, DONOR_FIRST_NAME, DONOR_LAST_NAME, DONOR_PREF_CLASS, UV_PHONE FROM TESTTABLE1 where AF_ASSIGNED_USER = 'tj11caro@siena.edu'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    
    $arr = array();
    if($result->num_rows > 0) {
    	while($row = $result->fetch_assoc()) {
    		$arr[] = $row;
    	}
    }
    
    # JSON-encode the response
    echo $json_response = json_encode($arr);
?>