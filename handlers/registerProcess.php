<?php

include_once "../dbconfig.php";  

$fullName = htmlspecialchars($_POST["name"]);
$email = htmlspecialchars($_POST["email"]);
$password = htmlspecialchars($_POST["password"]);
$confirmPassword = htmlspecialchars($_POST['confirm_password']);
$br = "<br>";

echo $email, $br, $password, $br, $confirmPassword;
echo $br;

if ($password == $confirmPassword) {
    $confirmPassword = password_hash($confirmPassword, PASSWORD_DEFAULT);
    $sql = "INSERT INTO user (full_name,email, password) VALUES ('$fullName','$email', '$confirmPassword')";}

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
    // header("location:../index.html");
    echo "logged in:Hello user" ;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();


