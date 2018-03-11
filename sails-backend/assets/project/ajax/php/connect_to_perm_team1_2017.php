<?php 
    // A simple PHP script demonstrating how to connect to MySQL.
    // Press the 'Run' button on the top to start the web server,
    // then click the URL that is emitted to the Output tab of        
    //the console.

    $servername = "oraserv.cs.siena.edu";
    $username = "perm_team1_2017";
    $password = "lekOncuc";
    $database = "perm_team1_2017";
    $dbport = 3306;

    // Create connection
    $mysqli = new mysqli($servername, $username, $password, $database, $dbport);

    // Check connection
    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    } 
    //echo "Connected successfully (".$mysqli->host_info.")";
?>