<?php
/**
 * Created by PhpStorm.
 * User: opensmarty
 * Date: 18-3-13
 * Time: 下午8:29
 */
define('ROOT_PATH', dirname(dirname(__FILE__)));
include ROOT_PATH.'/app/start.php';

// 防止页面乱码.
header("Content-type: text/html; charset=utf-8");
$f = $_GET['f'];
if (!empty($f)) {
    include APP_PATH . '/demo/' . $f . DEFAULT_EXT;
}
output('测试，请在该网址后面输入index.php?f=参数！！！');

