<?php
include_once "../dbconfig.php";

// Get user input
$email = $_GET['email'];
$password = $_GET['password'];

// Basic validation
if(empty($email) || empty($password)) {
    die("Please fill all fields");
}

// Prepare SQL statement to prevent SQL injection
$sql = "SELECT * FROM user WHERE email = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);
    $storedPassword = $user["password"]; // This should be hashed in your database
    
    // Verify password (use password_verify() if passwords are hashed)
    if (password_verify($password, $storedPassword)) { // For hashed passwords: password_verify($password, $storedPassword)
        
        // Check if the user is admin
        if($user['email'] == "admin@gmail.com") {
            // Redirect to admin panel
            header("Location: ../admin/build/index.html");
            exit();
        } else {
            // Redirect regular users
            header("Location: ../index.html");
            exit();
        }
    } else {
        echo "Password does not match";
    }
} else {
    echo "User not found! Please register";
}

// Close statement and connection
mysqli_stmt_close($stmt);
mysqli_close($conn);
?>