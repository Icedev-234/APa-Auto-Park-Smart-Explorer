<?php
session_unset();
session_destroy();
setcookie("user_id", '', time() - (86400 * 3), "/");
header("Location: ../login.php");
exit;
?>