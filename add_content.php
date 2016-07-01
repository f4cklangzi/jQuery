<?php
header('Content-Type: text/html;charset=utf-8');
/**
 *===================================================
 *Filename:add_content.php
 *Author:f4ck_langzi@foxmail.com
 *Date:2016-06-24 20:07
 *===================================================
 **/
if (!empty($_POST['title']) && !empty($_POST['username'])){
    require_once 'config.php';
    $_sql="INSERT INTO question(title,content,username,date) VALUES(:title,:content,:username,NOW())";
    $_stmt=$_pdo->prepare($_sql);
    $_title=$_POST['title'];
    $_content=$_POST['content'];
    $_username=$_POST['username'];
    $_stmt->bindParam(':title',$_title,PDO::PARAM_STR,40);
    $_stmt->bindParam(':content',$_content,PDO::PARAM_STR);
    $_stmt->bindParam(':username',$_username,PDO::PARAM_STR,20);
    $_num=$_stmt->execute();
    if ($_num===false){
        echo $_pdo->errorInfo()['2'];
    }else{
        echo 'success';
    }
}else{
    echo 'null';
}

?>
