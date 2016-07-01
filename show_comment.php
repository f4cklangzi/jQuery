<?php
header('Content-Type: text/html;charset=utf-8');
/**
 *===================================================
 *Filename:show_comment.php
 *Author:f4ck_langzi@foxmail.com
 *Date:2016-06-27 15:45
 *===================================================
 **/
require_once 'config.php';
if (!isset($_POST['id'])){
    die('null');
}
$_id=$_POST['id'];
$_pagesize=5;
$_sql="SELECT COUNT(*) AS count FROM comment WHERE question_id={$_id}";
$_stmt=$_pdo->query($_sql);
$_result=$_stmt->fetch(PDO::FETCH_ASSOC);
$_count=ceil($_result['count']/$_pagesize);
if (!isset($_POST['page'])){
    $_page=1;
}else{
    $_page=intval($_POST['page']);
    if ($_page>$_count){
        $_page=$_count;
    }
}
$_limit=($_page-1)*$_pagesize;
$_id=intval($_POST['id']);
$_sql="SELECT ({$_count}) AS count,id,question_id,username,content,date FROM comment WHERE question_id={$_id} ORDER BY date DESC LIMIT {$_limit},{$_pagesize}";
$_response='';
$_stmt=$_pdo->query($_sql);
$_result=$_stmt->fetchAll(PDO::FETCH_ASSOC);
if ($_stmt===false){
    echo 'error';
}else{
    if (empty($_result)){
        echo 'null';
    }else{
        foreach ( $_result as $_row){
            foreach ($_row as $_key => $_value){
                $_row[$_key]=str_replace("\n",'',$_value);
            }
            $_response .=json_encode($_row).',';

        };
        echo '['.substr($_response,0,strlen($_response)-1).']';
    }
}
?>
