<?php
header('Content-Type: text/html;charset=utf-8');
/**
 *===================================================
 *Filename:show_content.php
 *Author:f4ck_langzi@foxmail.com
 *Date:2016-06-25 13:10
 *===================================================
 **/
require_once 'config.php';
$_pagesize=5;
$_sql="SELECT COUNT(*) AS count FROM question";
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
$_sql="SELECT ($_count) AS total_question_count,(SELECT COUNT(*) FROM comment WHERE question_id=question.id)AS count,id,title,content,username,date FROM question ORDER BY date DESC LIMIT {$_limit},{$_pagesize}";
$_response='';
$_stmt=$_pdo->query($_sql);
if ($_stmt===false){
    echo '['.'{"error":"SQL ERROR"}'.']';
}else{
    if (empty($_stmt)){
        echo '['.'{"error":"NO CONTENT"}'.']';
    }else{
        foreach ($_stmt->fetchAll(PDO::FETCH_ASSOC) as $_row){
            foreach ($_row as $_key => $_value){
                $_row[$_key]=str_replace("\n",'',$_value);
            }
            $_response .=json_encode($_row).',';

        };
        echo '['.substr($_response,0,strlen($_response)-1).']';
    }
}
?>
