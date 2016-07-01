<?php
header('Content-Type: text/html;charset=utf-8');
/**
 *===================================================
 *Filename:add_comment.php
 *Author:f4ck_langzi@foxmail.com
 *Date:2016-06-26 22:40
 *===================================================
 **/
if (!empty($_POST['question_id']) && !empty($_POST['username']) && !empty($_POST['content'])){
    require_once 'config.php';
    $_sql="INSERT INTO comment(question_id,username,content,date) VALUES(:question_id,:username,:content,NOW())";
    $_stmt=$_pdo->prepare($_sql);
    $_question_id=$_POST['question_id'];
    $_username=$_POST['username'];
    $_content=$_POST['content'];
    $_stmt->bindParam(':question_id',$_question_id,PDO::PARAM_INT,6);
    $_stmt->bindParam(':username',$_username,PDO::PARAM_STR,20);
    $_stmt->bindParam(':content',$_content,PDO::PARAM_STR);
    $_num=$_stmt->execute();
    if ($_num===false){
        echo 'error';
    }else{
        echo 'success';
    }
}else{
    echo 'null';
}
?>
