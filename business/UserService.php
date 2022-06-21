<?php
declare(strict_types=1);

require_once("data/UserDAO.php");
require_once("entities/User.php");
require_once("./exceptions/UsernameAlreadyExistsException.php");

class UserService {
    public function register($username, $password) {
        $userDAO = new UserDAO();
        $hashedPassword = password_hash($password,PASSWORD_BCRYPT);
        $registered = $userDAO->register($username, $hashedPassword);  
        //code...
        
        return $registered;
        // hash password
        
    }
    public function login($username, $password) {
        $userDAO = new UserDAO();
        return $userDAO->login($username, $password);
    }
    public function getAll($id = false) {
        $userDAO = new UserDAO();
        $users = ($id ? $userDAO->getAll($id) : $userDAO->getAll());
        return $users;
    }
    public function getByUsername($username) {
        $userDAO = new UserDAO();
        $user = $userDAO->getByUsername($username);
        return $user;
    }
    public function checkToken($userId, $token) {
        $userDAO = new UserDAO();
        $user = $userDAO->getAll($userId);
        foreach ($user as $u) {
            $user = new User($u['id'], $u['username'], $u['password']);
        }
        if (hash_equals($user->getToken() ,$token)) return true;
        else return false;
    }
}