<?php
header('Content-Type: text/html;charset=utf-8');
/**
 *===================================================
 *Filename:show_hot.php
 *Author:f4ck_langzi@foxmail.com
 *Date:2016-06-28 22:36
 *===================================================
 **/
require_once 'config.php';
$_sql="SELECT (SELECT COUNT(*) FROM comment WHERE question_id=question.id)AS count,id,title,content,username,date FROM question ORDER BY count DESC LIMIT 1";
$_response='';
$_stmt=$_pdo->query($_sql);
if ($_stmt===false){
    $_response= '['.'{"error":"SQL ERROR"}'.']';
}else{
    if (empty($_stmt)){
        $_response= '['.'{"error":"NO CONTENT"}'.']';
    }else{
        foreach ($_stmt->fetchAll(PDO::FETCH_ASSOC) as $_row){
            foreach ($_row as $_key => $_value){
                $_row[$_key]=str_replace("\n",'',$_value);
            }
            $_response .=json_encode($_row).',';

        };
        $_response= '['.substr($_response,0,strlen($_response)-1).']';
    }
}
echo $_response;
?>
