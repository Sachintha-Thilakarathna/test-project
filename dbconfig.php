<?php
$servername = "localhost:3307";
$username = "root";
$password = "";
$dbName = "abc_company";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// echo "Connected successfully";
