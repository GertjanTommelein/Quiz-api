<?php
header("Access-Control-Allow-Origin: *");
require_once("./business/QuizService.php");

// if (isset($_SESSION['user'])) {
//     header("location: login.php");
// } else {
//     header("location: register.php");
// }

if (isset($_GET['q'])) {
    if ($_GET['q'] == "users") {
        $userSvc = new UserService();
        $data = [];
        $data['users_list'] = $userSvc->getAll();
        print(json_encode($data));
    }
    if ($_GET['q'] == "quiz") {
        $quizSvc = new QuizService();
        if (isset($_GET['id'])) print(json_encode($quizSvc->readOne($_GET['id']))); 
        else print(json_encode($quizSvc->readAll()));
    }
    if ($_GET['q'] == 'deleteQuiz' && isset($_GET['id'])) {
        $quizSvc = new QuizDAO();
        $quizSvc->delete($_GET['id']);
        $data['result'] = true;
        return $data;
    }
    /*if ($_GET['q'] == "createQuiz") {
        $quizSvc = ////
    }*/
} else {
    echo "Geen geldig api endpoint";
    die();
}