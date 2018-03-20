<?php
/**
 * Created by PhpStorm.
 * User: opensmarty
 * Date: 18-3-13
 * Time: 下午8:30
 */

/**
 * 字符串倒置.
 * @param $str
 */
function reverse_r($str)
{
    if (strlen($str) > 0) {
        reverse_r(substr($str, 1));
    }
    
    echo substr($str, 0, 1);
    return;
}

/**
 * output: !BOJ SIHT EVOL I
 */
reverse_r('I LOVE THIS JOB!');
