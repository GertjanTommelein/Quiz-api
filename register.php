<?php
declare(strict_types=1);

require_once("business/UserService.php");

if (isset($_GET['action']) && $_GET['action'] === 'register') {
    if (!empty($_POST['registerUsername']) && !empty($_POST['registerPassword'])) {
        $userSvc = new UserService();
        if ($userSvc->register($_POST['registerUsername'], $_POST['registerPassword'])) {
            session_start();
            $_SESSION['username'] = $_POST['registerUsername'];
            //header("location: login.php");
            return json_encode(['result' => $_SESSION['username']]);
            exit(0);
        }
    }
} else {
    return json_encode(['test' => 'testing']);
    // include("presentation/registerForm.php");
}