<?php
declare(strict_types=1);

class Question {
    public $id;
    public $title;
    public $choices = [];
    public $correctChoice;

    public function __construct($id, $question, $choices)
    {
        $this->id = $id;
        $this->title = $question;
        $this->choices = $choices;
    }

    public function getId() : int {
        return $this->id;
    }
    public function getQuestion() : string {
        return $this->title;
    }
    public function setCorrectChoice(int $correctChoice) {
        $this->correctChoice = $correctChoice;
    }
    public function getCorrectChoice() : int {
        return $this->correctChoice;
    }
    public function getChoices() : Array {
        return $this->choices;
    }
    public function setChoices(Array $choices) {
        $this->choices = $choices;
    }
    public function pushChoice(Array $choices) {
        array_push($this->choices, $choices);
    }
}