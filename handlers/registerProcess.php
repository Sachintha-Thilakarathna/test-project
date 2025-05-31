<?php

include_once "../test%20project/config/dbconfig.php";  

$email = htmlspecialchars($_POST["email"]);
$password = htmlspecialchars($_POST["password"]);
$confirmPassword = htmlspecialchars($_POST['confirm_password']);
$br = "<br>";

echo $email, $br, $password, $br, $confirmPassword;
echo $br;

$sql = "INSERT INTO `users`(`email`, `password`) VALUES ('$email','$password')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();


// INSERT INTO `users`(`email`, `password`) VALUES ('test@gmail.com','123')