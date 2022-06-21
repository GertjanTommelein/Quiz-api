<?php
declare(strict_types=1);

require_once("data/Database.php");
require("entities/User.php");
require_once("./exceptions/UsernameAlreadyExistsException.php");

class UserDAO {
    
    public function register($username, $password) {
        if (!$this->isUsernameAvailable($username)) {
            throw new UsernameAlreadyExistsException();
        } else {
            $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
            $db = new Database();
            $conn = $db->connect();
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('ss', $username, $password);
            return $stmt->execute() ?  true :  false;
        }
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
    public function getByUsername($username) {
        $sql = "SELECT * FROM users WHERE username = ?";
        $db = new Database();
        $result = $db->pQuery($sql, 's', [$username]);
        $row = $result->fetch_assoc();
        $user = new User($row['id'], $row['username'], $row['password']);
        return $user;
       
    }
    public function isUsernameAvailable($username) {
        $sql = "SELECT * FROM users WHERE username = ?";
        $db = new Database();
        $result = $db->pQuery($sql, 's', [$username]);
        if ($result->num_rows == 0) return true;
        else return false;
    }
    public function getAll($id = false) {
        $sql = "SELECT id, username, password, created_at FROM users ". ($id ? "WHERE id = ?" : "");
        $db = new Database();
        $result = ($id ? $db->pQuery($sql, 'i', [$id]) : $db->pQuery($sql));
        $resultSet = $result->fetch_all(MYSQLI_ASSOC);
        return $resultSet;
    }
    public function get($id) {
        $sql = "SELECT id, username, created_at FROM users WHERE id = ?";
        $db = new Database();
        $result = $db->pQuery($sql, 'i', $id);
        $resultSet = $result->fetch_assoc();
        return $resultSet;
    } 
}