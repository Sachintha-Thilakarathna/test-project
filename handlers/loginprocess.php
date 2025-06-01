<?php
include_once "../dbconfig.php";
$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM user WHERE email = '$email'";
$result = mysqli_query($conn,$sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    $userpassword = $user["password"];

    if ($userpassword == $password) {
        echo "successfull login";
    } else {
        echo "password not match";
    }
} else {
    echo "user not found! please register";
}