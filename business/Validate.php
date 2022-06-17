<?php
declare(strict_types=1);

class Validate {
    public static function email($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }
}