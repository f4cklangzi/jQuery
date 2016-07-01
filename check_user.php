<?php
header('Content-Type: text/html;charset=utf-8');
/**
 *===================================================
 *Filename:check_user.php
 *Author:f4ck_langzi@foxmail.com
 *Date:2016-06-15 20:57
 *===================================================
 **/
require_once 'config.php';
if (isset($_POST['username']) && isset($_POST['password'])){
    $_sql="SELECT * FROM zw_user WHERE username=:username  AND password=:password";
    $_stmt=$_pdo->prepare($_sql);
    $_username=$_POST['username'];
    $_password=sha1($_POST['password']);
    //绑定参数分别是参数标识符，绑定到 SQL 语句参数的 PHP 变量名(只能是变量名，不能是值)，
    //使用 PDO::PARAM_* 常量明确地指定参数的类型，数据类型的长度，成功时返回 TRUE， 或者在失败时返回 FALSE
    $_stmt->bindParam(':username',$_username,PDO::PARAM_STR,20);
    $_stmt->bindParam(':password',$_password,PDO::PARAM_STR,40);
    $_num=$_stmt->execute();
    if ($_num===false){
        echo 'ERROR';
    }else{
        if ($_row=$_stmt->fetch(PDO::FETCH_OBJ)){
            echo 'success';
        }else{
            echo 'null';
        }
    }
}elseif (isset($_POST['username'])){
    $_sql="SELECT username FROM zw_user WHERE username=:username";
    $_stmt=$_pdo->prepare($_sql);
    $_username=$_POST['username'];
    $_stmt->bindParam(':username',$_username,PDO::PARAM_STR,20);
    $_num=$_stmt->execute();
    if ($_num===false){
        echo 'ERROR';
    }else{
        $_row=$_stmt->fetch(PDO::FETCH_OBJ);
        if ($_row){
           echo 'false';
        }else{
            echo 'true';
        };
    }
}else{
    echo 'ERROR';
}

?>
