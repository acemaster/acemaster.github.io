<?php
$con=mysqli_connect("localhost","root","vivek123","nitwproject");
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
$rollno = mysqli_real_escape_string($con, $_POST['rollno']);
$password = mysqli_real_escape_string($con, $_POST['password']);
$email = mysqli_real_escape_string($con, $_POST['email']);
$passwordcon=mysqli_real_escape_string($con, $_POST['password_confirm']);
if($password==$passwordcon)
{
$sql="INSERT INTO users (rollno, password, email)
VALUES ('$rollno', '$password', '$email')";
echo "1 record added";
header('Location: admin.html');
}
else
{
	echo "wroooooong";
	header('Location :registration.html');
}
if (!mysqli_query($con,$sql)) {
  die('Error: ' . mysqli_error($con));
}


mysqli_close($con);

?>