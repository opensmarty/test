<?php
/**
 * Created by PhpStorm.
 * User: opensmarty
 * Date: 18-3-13
 * Time: 下午8:33
 */

function output($result, $type = 'json')
{
    if (is_array($result)) {
        if ($type == 'dump') {
            var_dump($result);
        } elseif ($type == 'json') {
            echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
        }
    } else {
        echo $result;
    }
}