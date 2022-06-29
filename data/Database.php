<?php
//data/database.php
require_once("data/DBConfig.php");
class Database {
    private $conn;
    public function connect() {
        try {
            $connection = mysqli_connect(DBConfig::$DB_HOST, DBConfig::$DB_USERNAME, DBConfig::$DB_PASSWORD, DBCOnfig::$DB_NAME);
        } catch (mysqli_sql_exception $e) {
            $error = $e->getMessage();
           echo $error;
           die();
        }
        return $connection;
    }
    public function getLastInsertedId() {
        return $this->conn->insert_id;
    }
    public function pQuery($sql, $paramTypes = false ,$paramBindings = false) {
        $sqlStr = explode(' ', $sql);
        
        $this->conn = $this->connect();
        $stmt = $this->conn->prepare($sql);
        if ($paramTypes && $paramBindings) {
            gettype($paramBindings) ? $stmt->bind_param($paramTypes, ...$paramBindings) : $stmt->bind_param($paramTypes, $paramBindings);
        }
        if (strtolower($sqlStr[0]) == 'update') {
            return $stmt->execute();
        }
        $stmt->execute();
        $result = $stmt->get_result();
        return $result;
    }
}