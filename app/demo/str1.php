<?php
/**
 * Created by PhpStorm.
 * User: opensmarty
 * Date: 18-3-14
 * Time: 上午9:23
 */

/**
 * output: hello
 */
$a = "hello";
$b = &$a;
unset($b);
$b = "world";
echo $a . '<br>';

$a = "ok, you are successful!";
$b = &$a;
echo $b;
