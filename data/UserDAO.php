<?php
declare(strict_types=1);

require_once("data/Database.php");
require("entities/User.php");

class UserDAO {
    
    public function register($username, $password) {
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        $db = new Database();
        $conn = $db->connect();
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ss', $username, $password);
        return $stmt->execute() ?  true :  false;
    }
    public function login($username, $password) {
        $sql = "SELECT id, username, password FROM users WHERE username = ?";
        $db = new Database();
        $conn = $db->connect();
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'] == null ? '' : $row['password'])) {
            $user = new User($row['id'] ,$row['username'], $row['password']);
            $conn->close();
            return $user;
        } else {
            return NULL;
        }
    }
    public function getAll() {
        $sql = "SELECT id, username, created_at FROM users";
        $db = new Database();
        $result = $db->pQuery($sql);
        $resultSet = $result->fetch_all(MYSQLI_ASSOC);
        return $resultSet;
    }
}