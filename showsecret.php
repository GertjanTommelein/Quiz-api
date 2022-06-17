<?php
declare(strict_types=1);

if (isset($_GET['permission']) && $_GET['permission'] === "granted") {
    include("presentation/secretinformation.php");
} else {
    header("location: login.php");
    exit(0);
}