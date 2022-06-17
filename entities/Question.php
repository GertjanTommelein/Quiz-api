<?php
declare(strict_types=1);

class Question {
    public $id;
    public $question;
    public $choices = [];

    public function __construct($id, $question, $choices)
    {
        $this->id = $id;
        $this->question = $question;
        $this->choices = $choices;
    }

    public function getId() : int {
        return $this->id;
    }
    public function getQuestion() : string {
        return $this->question;
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