<?php
// The mysql database connection script
require_once 'connect_to_perm_team1_2017.php'; 
//This decodes json data provided by controller
    
    $query = "SELECT username, password, isAdmin FROM Users WHERE email = 'na31maro@siena.edu' ";   
    
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        
    $row = $result->fetch_assoc();

    echo $row['password']; 


    $row['loggedIn'] = 'true'; 
 
    var_dump($row); 

    
    # JSON-encode the response
    //echo $arr[0];
    //echo $json_response = json_encode($arr);


?>
