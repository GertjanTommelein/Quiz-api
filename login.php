<?php
declare(strict_types=1);

require_once("business/UserService.php");
session_start();

//$vali = $_POST['loginUsername'];

$json = file_get_contents("php://input");
$postData= json_decode($json, true);

if (isset($_GET['action']) && $_GET['action'] === "login") {
    if (!empty($postData['loginUsername']) && !empty($postData['loginPassword'])) {
        $userSvc = new UserService();
        if ($loggedInUser = $userSvc->login($postData['loginUsername'], $postData['loginPassword'])) {
            $_SESSION['userId'] = $loggedInUser->getId();
            $data = [];
            $data['result']['user'] = [
                'userId' => $_SESSION['userId'],
                'username' => $loggedInUser->getUsername()
            ];
            $data['user_id'] = $loggedInUser->getId();
            $data['token'] = $loggedInUser->getToken();
            //echo json_encode($data);
            print json_encode($data);
            exit(0);
        } else {
            //header("location: login.php?error=true");
            print(json_encode(['error' => 'invalid login']));
            exit(0);
        }
    } else {
        print(json_encode(['error' => 'emptyInputs']));
    }
} else {
    //include("presentation/loginForm.html");
    print(json_encode(['error' => 'invalidInputs']));
}

