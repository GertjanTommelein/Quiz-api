<?php
declare(strict_types=1);

require_once("business/UserService.php");
session_start();
$vali = $_POST['loginUsername'];

if (isset($_GET['action']) && $_GET['action'] === "login") {
    if (!empty($_POST['loginUsername']) && !empty($_POST['loginPassword'])) {
        $userSvc = new UserService();
        if ($loggedInUser = $userSvc->login($_POST['loginUsername'], $_POST['loginPassword'])) {
            $_SESSION['userId'] = $loggedInUser->getId();
            $data = [];
            $data['result']['user'] = [
                'userId' => $_SESSION['userId'],
                'username' => $loggedInUser->getUsername()
            ];
            echo json_encode($data);
            print_r($loggedInUser);
            exit(0);
        } else {
            //header("location: login.php?error=true");
            print(json_encode(['error' => 'login']));
            exit(0);
        }
    } else {
        print(json_encode(['error' => 'emptyInputs']));
    }
} else {
    //include("presentation/loginForm.html");
    print(json_encode(['error' => 'invalidInputs']));
}

