<?php
/**
 * Created by PhpStorm.
 * User: opensmarty
 * Date: 18-3-13
 * Time: 下午8:33
 */

function output ( $result, $type = 'json' )
{
    if (is_bool($result)) {
        var_dump($result);
    } elseif (is_array($result)) {
        if ($type == 'dump') {
            echo '<pre>';
            var_dump($array);
            echo '<pre>';
        } elseif ($type == 'json') {
            echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
        }
    } else {
        echo $result;
    }
}

// 判断是否为空
function is_empty ( $param )
{
    return empty($param);
}

// 模拟GET请求
function curl_get ( $url )
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    //参数为1表示传输数据，为0表示直接输出显示。
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    //参数为0表示不带头文件，为1表示带头文件
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $result = curl_exec($ch);
    curl_close($ch);
    
    return $result;
}

/*
  * url:访问路径
  * array:要传递的数组
  * */
function curl_post ( $url, $array )
{
    
    $curl = curl_init();
    //设置提交的url
    curl_setopt($curl, CURLOPT_URL, $url);
    //设置头文件的信息作为数据流输出
    curl_setopt($curl, CURLOPT_HEADER, 0);
    //设置获取的信息以文件流的形式返回，而不是直接输出。
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    //设置post方式提交
    curl_setopt($curl, CURLOPT_POST, 1);
    //设置post数据
    $post_data = $array;
    curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
    //执行命令
    $data = curl_exec($curl);
    //关闭URL请求
    curl_close($curl);
    
    //获得数据并返回
    return $data;
}