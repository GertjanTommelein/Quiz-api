<?php
declare(strict_types=1);

require_once("data/UserDAO.php");
require_once("entities/User.php");

class UserService {
    public function register($username, $password) {
        $userDAO = new UserDAO();
        // hash password
        $hashedPassword = password_hash($password,PASSWORD_BCRYPT);
        return $userDAO->register($username, $hashedPassword);
    }
    public function login($username, $password) {
        $userDAO = new UserDAO();
        return $userDAO->login($username, $password);
    }
    public function getAll() {
        $userDAO = new UserDAO();
        $users = $userDAO->getAll();
        return $users;
    }
}