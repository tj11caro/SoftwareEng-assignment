<?php 
require_once 'connect_to_perm_team1_2017.php'; 
    $query= $advancedSearch;
    $query = "select * from TESTTABLE1 where Donor_First_Name = 'James'"
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