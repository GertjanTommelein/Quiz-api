<?php
require("business/QuizService.php");
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
$quizSvc = new QuizService();
//print($quizSvc->readAll());
$quizSvc->createQuiz(1, 'test quiz', "testing quiz", [['question' => 'test question', 'choices' => [['answer' => 'answer1', 'correct' => '1'], ['answer' => 'answer2', 'correct' => '0'], ['answer' => 'answer3', 'correct' => '0'], ['answer' => 'answer4', 'correct' => '0']]]]);