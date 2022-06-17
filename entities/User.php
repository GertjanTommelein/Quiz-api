<?php
//entities/User.php

declare(strict_types=1);

class User {
    private int $id;
    private string $username;
    private string $password;
    public function __construct(int $id, string $username, string $password)
    {
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
    }
    public function getUsername() : string {
        return $this->username;
    }
    public function getId() : int {
        return $this->id;
    }
    public function checkPassword(string $password) {
        return password_verify($password, $this->password);
    }
    public function setUsername($username) {
        $this->username = $username;
    }
}