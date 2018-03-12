<?php
// The mysql database connection script
require_once 'connect_to_perm_team1_2017.php'; 
//This decodes json data provided by controller
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
    
    $email = mysqli_real_escape_string($mysqli, $info->email);
    $password = mysqli_real_escape_string($mysqli, $info->password);
    
    $query = "SELECT email, password, isAdmin FROM Users WHERE email = '$email'";   
    
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
            
    $row = $result->fetch_assoc();
    
    $responseArray = array(); 
    
    $responseArray['username'] = $row['email']; 
    $responseArray['isAdmin'] = $row['isAdmin'];     
    
    if ($password != "" && $password == $row['password']) {
            $responseArray['loggedIn'] = 'true'; 
    } else {
            $responseArray['loggedIn'] = 'false'; 
    }
 
    # JSON-encode the response
    echo $json_response = json_encode($responseArray);
}

?>
