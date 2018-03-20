<?php
/**
 * Created by PhpStorm.
 * User: opensmarty
 * Date: 18-3-14
 * Time: 上午9:49
 */

/**
 * output:
 * {
 *    "0": "NO.201608020005",
 *    "1": "NO.201608020016_R",
 *    "2": "NO.201608020210",
 *    "3": "NO.201608020331_R"
 * }
 */
$pattern = '#NO\.[0-9]{12}(_R)?#i';
$subject = 'NO.201608020005';
$subject .= 'NO.201608020016_R';
$subject .= 'NO.201608020210';
$subject .= 'NO.201608020331_R';
if (preg_match_all($pattern, $subject, $match)) {
    output($match[0]);
} else {
    echo "A match was not found.";
}

// 从 URL 中取得主机名
//preg_match("/^(http:\/\/)?([^\/]+)/i","http://blog.snsgou.com/index.php", $matches);
//$host = $matches[2];

// 从主机名中取得后面两段
//preg_match("/[^\.\/]+\.[^\.\/]+$/", $host, $matches);
//echo "域名为：{$matches[0]}";
