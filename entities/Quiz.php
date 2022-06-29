<?php 
declare(strict_types=1);

class Quiz {
    public $id;
    public $title;
    public $description;
    public $questions = [];
    public $createdBy;

    public function __construct($id, $title, $description) {
        $this->id = $id;
        $this->title = $title;
        $this->description = $description;
        $this->questions = [];
    }
    public function getId() : int {
        return $this->id;
    }
    public function getTitle() : string {
        return $this->title;
    }
    public function getDescription() : string {
        return $this->description;
    }
    public function setCreatedBy(string $createdBy) {
        $this->createdBy = $createdBy;
    }
    public function getCreatedBy() : string {
        return $this->createdBy;
    }
    public function getQuestions() : Array {
        return $this->questions;
    }
    public function setQuestions(Array $questions) {
        $this->questions = $questions;
    }
    public function pushQuestion($question) {
        array_push($this->questions, $question);
    }
}