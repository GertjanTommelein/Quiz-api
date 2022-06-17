<?php
declare(strict_types=1);
require_once("data/QuizDAO.php");
require_once("entities/Quiz.php");
class QuizService {
    public function createQuiz($uid, $title, $description, $questions) {
        $quizDAO = new QuizDAO();
        $quiz = $quizDAO->create($uid, $title, $description, $questions);
        if (is_null($quiz)) return NULL;
        else return json_encode($quiz);
    }
    public function readAll() {
        $quizDAO = new QuizDAO();
        $data['quiz_list'] = $quizDAO->read();
        return $data;
    }
    public function readOne($id) {
        try {
            $quizDAO = new QuizDAO();
            $quizData = $quizDAO->read($id);
        } catch (Exception $e) {
            $error = $e->getMessage();
            $data['error'] = $error;
            return $data;
        }
        return $quizData;
    }
    public function delete($id) {
        $quizDAO = new QuizDAO();
        $quizDAO->delete($id);
    }
}