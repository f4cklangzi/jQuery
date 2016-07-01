<?php
header('Content-Type: text/html;charset=utf-8');
/**
 *===================================================
 *Filename:add_user.php
 *Author:f4ck_langzi@foxmail.com
 *Date:2016-06-14 18:57
 *===================================================
 **/
if (!isset($_POST['username']) || !isset($_POST['password']) || !isset($_POST['email'])){
    exit('null');
};
require_once 'config.php';
$_sql="INSERT INTO zw_user(username,password,email,sex,birthday,date) VALUES(:username,:password,:email,:sex,:birthday,NOW())";
$_stmt=$_pdo->prepare($_sql);
$_username=$_POST['username'];
$_password=sha1($_POST['password']);
$_email=$_POST['email'];
$_sex=$_POST['sex'];
$_birthday=$_POST['birthday'];
//绑定参数分别是参数标识符，绑定到 SQL 语句参数的 PHP 变量名(只能是变量名，不能是值)，
//使用 PDO::PARAM_* 常量明确地指定参数的类型，数据类型的长度，成功时返回 TRUE， 或者在失败时返回 FALSE
$_stmt->bindParam(':username',$_username,PDO::PARAM_STR,20);
$_stmt->bindParam(':password',$_password,PDO::PARAM_STR,40);
$_stmt->bindParam(':email',$_email,PDO::PARAM_STR,100);
$_stmt->bindParam(':sex',$_sex,PDO::PARAM_STR,10);
$_stmt->bindParam(':birthday',$_birthday,PDO::PARAM_STR);
$_num=$_stmt->execute();
if ($_num===false){
    echo 'error';
}else{
    echo 'success';
}
?>
