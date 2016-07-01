<?php
header('Content-Type: text/html;charset=utf-8');
/**
 *===================================================
 *Filename:config.php
 *Author:f4ck_langzi@foxmail.com
 *Date:2016-06-14 18:52
 *===================================================
 **/
try{
    $_dsn='mysql:host=127.0.0.1;dbname=zhiwen';
    $_username='root';
    $_password='root';
    $_pdo=new PDO($_dsn,$_username,$_password);
}catch(PDOException $e){
    echo $e->getMessage();
}
$_pdo->exec('SET NAMES utf8')
?>
