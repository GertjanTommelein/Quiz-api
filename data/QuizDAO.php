<?php 
declare(strict_types=1);
require_once('data/Database.php');
require_once('./entities/Quiz.php');
require_once('./entities/Question.php');
require_once('./exceptions/NotEnoughQuestions.php');
class QuizDAO {
    public function create(int $uid, string $title, string $description, Array $questions = []) {
        if (count($questions) < 1) {
            throw new NotEnoughQuestions();
        }
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
            $sql = "INSERT INTO questions (quiz_id, title) VALUES (?, ?)";
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
        $sql = "SELECT ql.id, ql.title, ql.description, ql.created_at,ql.created_by, u.username as username FROM quiz_list ql INNER JOIN users u on ql.created_by = u.id " . ($id ? "WHERE ql.id = ?" : "");
        $db = new Database();
        $result = ($id ? $db->pQuery($sql, 'i', [$id]) : $db->pQuery($sql));
        if (!$result->num_rows > 0) {
            throw new Exception("Quiz bestaat niet");
        }
        
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $quizList = [];
        foreach ($rows as $row) {
            $quiz = new Quiz($row['id'], $row['title'], $row['description']);
            $quiz->setCreatedBy($row['username']);
            $questionSql = "SELECT *  FROM questions WHERE quiz_id = ?";
            $choicesSql = "SELECT * FROM choices WHERE question_id = ?";
            $result = $db->pQuery($questionSql, 'i', [$quiz->getId()]);
            $questionRows = $result->fetch_all(MYSQLI_ASSOC);
            $question = false;
            foreach ($questionRows as $questionRow) {
                $question = new Question($questionRow['id'], $questionRow['title'],[]);
                $choicesResult = $db->pQuery($choicesSql, 'i', [$question->getId()]);
                $choicesRows = $choicesResult->fetch_all(MYSQLI_ASSOC);
                $i = 1;
                foreach ($choicesRows as $choiceRow) {
                    $choicesData = ['id' => $choiceRow['id'], 'title' => $choiceRow['answer'], 'correct' => $choiceRow['correct']];
                    if ($choiceRow['correct'] == 1) $question->setCorrectChoice($i);
                    $question->pushChoice($choicesData);
                    $i++;
                }
                $quiz->pushQuestion($question);
            }
            array_push($quizList, $quiz);
        }
        return $quizList;
    }
    public function update(int $quizId, string $quizTitle, string $quizDescription, array $questions) {
        $sql = "UPDATE quiz_list SET title = ?, description = ? WHERE id = ?";
        $questionSql = "UPDATE questions SET title = ? WHERE quiz_id = ? AND id = ?";
        $choicesSql = "UPDATE choices SET answer = ?, correct = ? WHERE question_id = ? AND id = ?";
        $db = new Database();
        $conn = $db->connect();
        $conn->begin_transaction();
        try {
            $db->pQuery($sql, 'ssi', [$quizTitle, $quizDescription, $quizId]);
            
            foreach ($questions as $question) {
                $db->pQuery($questionSql, 'sii', [$question['title'], $quizId, $question['id']]);
                if (!isset($question['id'])) {
                    $insertQuestionSql = "INSERT INTO questions (quiz_id, title) VALUES (?, ?)";
                    $db->pQuery($insertQuestionSql, 'is', [$quizId, $question['title']]);
                    $questionLastInsertedId = $db->getLastInsertedId();
                    foreach ($question['choices'] as $choice) {
                        $choicesSql = "INSERT INTO choices (question_id, answer, correct) VALUES (?, ?, ?)";
                        $choiceResult = $db->pQuery($choicesSql, 'isi', [$questionLastInsertedId, $choice['title'], $choice['correct']]);
                    }
                } else {
                    $lastUpdatedQuestionId = $db->getLastInsertedId();
                    foreach ($question['choices'] as $choice) {
                       $db->pQuery($choicesSql, 'siii', [$choice['title'], $choice['correct'], $question['id'], $choice['id']]);
                    }
                }
            }
        
        $conn->commit();
        $data['result'] = true;
        return $data;
        } catch (mysqli_sql_exception $e) {
            $conn->rollback();
            throw $e;
            $data['result'] = false;
            return $data;
        }


        

    }
    public function delete($id) {
        $sql = "DELETE FROM quiz_list WHERE id = ?";
        $questionSql = "DELETE FROM questions WHERE quiz_id = ?";
        $db = new Database();
        $conn = $db->connect();
        $selectQuestionsIdsSql = "SELECT id FROM questions WHERE quiz_id = ?";
        $result = $db->pQuery($selectQuestionsIdsSql, 'i', [$id]);
        $questionsIds = [];
        while($row = $result->fetch_row()) {
            array_push($questionsIds, $row[0]);
        }
        foreach($questionsIds as $qid) {
            $stmt = $conn->prepare("DELETE FROM choices WHERE question_id = ?");
            $stmt->bind_param('i', $qid);
            $stmt->execute();
        }
        $stmt2 = $conn->prepare($questionSql);
        $stmt = $conn->prepare($sql);
        $stmt2->bind_param('i', $id);
        $stmt->bind_param('i', $id);
        $stmt2->execute();
        $stmt->execute();
        
        $conn->close();
    }
    public function test($id) {
        $sql = "SELECT id FROM questions WHERE quiz_id = ?";
        $db = new Database();
        $result = $db->pQuery($sql, 'i', [$id]);
        $arr = [];
        while($row = $result->fetch_row()) {
            array_push($arr, $row[0]);
        }
        return $arr;
    }
}