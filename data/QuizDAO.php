<?php 
declare(strict_types=1);
require_once('data/Database.php');
require_once('./entities/Quiz.php');
require_once('./entities/Question.php');
class QuizDAO {
    public function create(int $uid, string $title, string $description, Array $questions = []) {
        $sql = "INSERT INTO quiz_list (title, description, created_by) VALUES (?, ? , ?)";
        $db = new Database();
        $result =  $db->pQuery($sql, 'ssi', [$title, $description, $uid]);
        if (is_null($result)) return NULL;
        else {
            $result =  $db->pQuery("SELECT * FROM quiz_list WHERE id = ?", 'i', [$db->getLastInsertedId()]);
            $row = $result->fetch_assoc();
        } 
        $quiz = new Quiz((int)$row['id'], $row['title'], $row['description']);
        foreach ($questions as $question) {
            $sql = "INSERT INTO questions (quiz_id, question) VALUES (?, ?)";
            $result = $db->pQuery($sql, 'is', [$quiz->getId(), $question['question']]);
            $questionLastInsertedId = $db->getLastInsertedId();
            foreach ($question['choices'] as $choice) {
                $choicesSql = "INSERT INTO choices (question_id, answer, correct) VALUES (?, ?, ?)";
                $choiceResult = $db->pQuery($choicesSql, 'isi', [$questionLastInsertedId, $choice['answer'], $choice['correct']]);
            }
           /* echo '<pre>';
            var_dump($questions);
            die();*/
        }
        return $quiz;
    }
    public function read($id = false) {
        $sql = "SELECT ql.id, ql.title, ql.description, ql.created_at,ql.created_by FROM quiz_list ql " . ($id ? "WHERE ql.id = ?" : "");
        $db = new Database();
        $result = ($id ? $db->pQuery($sql, 'i', [$id]) : $db->pQuery($sql));
        if (!$result->num_rows > 0) {
            throw new Exception("Quiz bestaat niet");
        }
        
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $quizList = [];
        foreach ($rows as $row) {
            $quiz = new Quiz($row['id'], $row['title'], $row['description']);
            $questionSql = "SELECT * FROM questions INNER JOIN choices on questions.id = choices.question_id WHERE quiz_id = ?";
            $result = $db->pQuery($questionSql, 'i', [$quiz->getId()]);
            $questionRows = $result->fetch_all(MYSQLI_ASSOC);
            $questionAnswers = [];
            $question = false;
            foreach ($questionRows as $questionRow) {
                if (!$question)  $question = new Question($questionRow['id'], $questionRow['title'],[]);
                $choicesData = ['title' => $questionRow['answer'], 'correct' => $questionRow['correct']];
                $question->pushChoice($choicesData);
            }
            $quiz->pushQuestion($question);
            array_push($quizList, $quiz);
        }
        return $quizList;
    }
    public function update() {

    }
    public function delete($id) {
        $sql = "DELETE FROM quiz_list WHERE id = ?";
        $questionSql = "DELETE FROM questions WHERE quiz_id = ?";
        $db = new Database();
        $conn = $db->connect();
        $stmt = $conn->prepare($questionSql);
        $stmt2 = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt2->bind_param('i', $id);
        $stmt->execute();
        $stmt2->execute();
        $conn->close();
    }
}