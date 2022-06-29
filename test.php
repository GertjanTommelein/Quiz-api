<?php
require("business/QuizService.php");
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
$quizSvc = new QuizService();
$quizDAO = new QuizDAO();
$sql = 'UPDATE this on that';
$sqlStr = explode(' ', $sql);
print(strtolower($sqlStr[0]) == 'update');
/*try {
    $test = $quizDAO->update(33, 'Animal quiz', 'A quiz where you have to answer questions about various animals.', [
        ['id' => 21, 'title' => 'How many legs does a giraffe have', 'choices' => [['id' => 53, 'answer' => '3', 'correct' => 0], ['id' => 54, 'answer' => '4', 'correct' => 1], ['id' => 55, 'answer' => '2', 'correct' => 0], ['id' => 56, 'answer' => '5', 'correct' => 0]]]
    ]);
} catch (Exception $e) {
    print($e->getMessage());
}*/
//print($quizSvc->readAll());
//$quizSvc->createQuiz(1, 'test quiz', "testing quiz", [['question' => 'test question', 'choices' => [['answer' => 'answer1', 'correct' => '1'], ['answer' => 'answer2', 'correct' => '0'], ['answer' => 'answer3', 'correct' => '0'], ['answer' => 'answer4', 'correct' => '0']]]]);