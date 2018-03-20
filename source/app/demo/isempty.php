<?php
/**
 * Created by PhpStorm.
 * User: opensmarty
 * Date: 18-3-14
 * Time: 上午9:03
 */

/**
 * output: 35
 */
$a = null;
if (isset($a) && empty($a)) {
    echo '1';
}
//output($a === false);
if (isset($a) && $a === false) {
    echo '2';
}

//output($a == '');
if ($a == '') {
    echo '3';
}

//output($a === '');
if ($a === '') {
    echo '4';
}
if (empty($a)) {
    echo '5';
}