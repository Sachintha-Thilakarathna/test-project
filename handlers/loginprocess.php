<?php
include_once "../dbconfig.php";
$email = $_POST['email'];
$password = $_POST['password'];

$result = mysqli_query($conn, $sql);
$conn = mysqli_connect("localhost", "root", "", "abc_company");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM user WHERE email = '$email'";
$result = mysqli_query($conn, $sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    var_dump($user);
    $userPassword = $user["password"];

    if ($userPassword == $password) {
        echo "successfull login";
    } else {
        echo "password not match";
    }
} else {
    echo "user not found! please register";
}