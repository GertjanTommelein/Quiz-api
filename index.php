<?php
header("Access-Control-Allow-Origin: *");
require_once("./business/QuizService.php");
require_once("./business/UserService.php");

// if (isset($_SESSION['user'])) {
//     header("location: login.php");
// } else {
//     header("location: register.php");
// }

if (isset($_GET['q'])) {
    if ($_GET['q'] == "users") {
        $userSvc = new UserService();
        $data = [];
        $data['users_list'] = ( isset($_GET['id']) ? $userSvc->getAll($_GET['id']) : $userSvc->getAll());
        print(json_encode($data));
    }
    if ($_GET['q'] == "quiz") {
        $quizSvc = new QuizService();
        if (isset($_GET['id'])) print(json_encode($quizSvc->readOne($_GET['id']))); 
        else print(json_encode($quizSvc->readAll()));
    }
    if ($_GET['q'] == "createQuiz") {
        $quizSvc = new QuizService();
        $json = file_get_contents('php://input');
        $jsonData = json_decode($json, true);

        if (is_null($quiz = $quizSvc->createQuiz($jsonData['id'], $jsonData['quizTitle'], $jsonData['quizDescription'], $jsonData['quizQuestions']))) {
            $data['error'] = 'error';
            print(json_encode($data));
        }
        else print($quiz);
        

    }
    if ($_GET['q'] == 'deleteQuiz' && isset($_GET['id'])) {
        $quizSvc = new QuizDAO();
        $quizSvc->delete($_GET['id']);
        $data['result'] = true;
        print(json_encode($data));
    }
    if ($_GET['q'] == "isUserLoggedIn") {
        $userSvc = new UserService();
        $json = file_get_contents('php://input');

        // decode the json data
        $jsonData = json_decode($json, true);

        if (isset($jsonData['id']) && isset($jsonData['token']) && $userSvc->checkToken($jsonData['id'], $jsonData['token'])) $data['result'] = true;
        else $data['result'] = false;
        print(json_encode($data));
    }
    if ($_GET['q'] == 'updateQuiz') {
        $quizSvc = new QuizService();
        $json = file_get_contents('php://input');
        $jsonData = json_decode($json, true);
        $result = $quizSvc->update($jsonData['id'], $jsonData['title'], $jsonData['description'], $jsonData['questions']);
        print(json_encode($result));
        // print('<pre>');
        // var_dump($jsonData);
    }
    /*if ($_GET['q'] == "createQuiz") {
        $quizSvc = ////
    }*/
} else {
    echo "Geen geldig api endpoint";
    die();
}