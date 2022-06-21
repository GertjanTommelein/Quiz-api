<?php
declare(strict_types=1);

require_once("business/UserService.php");
if (isset($_GET['action']) && $_GET['action'] === 'register') {
    if (!empty($_POST['registerUsername']) && !empty($_POST['registerPassword'])) {
        $userSvc = new UserService();
        try {
            $registeredUser = $userSvc->register($_POST['registerUsername'], $_POST['registerPassword']);
                session_start();
                $_SESSION['username'] = $_POST['registerUsername'];
                $user = $userSvc->getByUsername($_SESSION['username']);
                //header("location: login.php");
                    $data['result']['user_id'] = $user->getId();
                    $data['result']['token'] = $user->getToken();
                print(json_encode($data));
                exit(0);
        } catch (Exception $e) {
            $errors['error'] = 'Gebruikersnaam bestaat al';
            print(json_encode($errors));
        }
        
    } else {
        print(json_encode(['error' => "emptyInputs"]));
    }
} else {
    // include("presentation/registerForm.php");
}