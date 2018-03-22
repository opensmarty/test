<?php
/**
 * Created by PhpStorm.
 * User: opensmarty
 * Date: 18-3-13
 * Time: 下午8:29
 */
define('ROOT_PATH', dirname(dirname(__FILE__)));
require_once ROOT_PATH.'/app/common/common.php';

// 设置模拟HTTP请求的参数。
if (! isset($argv[1])) {
    $argv[1] = '/';
}

$queryString = str_replace('\+', '+', preg_replace('#\?|(?<!\\\\)\\+#', '&', ltrim($argv[1], '/')));

$_SERVER = ['HTTPS'                => 'off', //如果通过https访问,则被设为一个非空的值(on)，否则返回off
            'HTTP_X_REAL_IP'       => '127.0.0.1',
            'HTTP_X_FORWARDED_FOR' => '127.0.0.1',
            'HTTP_HOST'            => '127.0.0.1',
            'HTTP_CONNECTION'      => 'close',
            'HTTP_ACCEPT'          => 'text/html, application/xhtml+xml, application/xml, */*',
            'HTTP_ACCEPT_CHARSET'  => 'utf-8',
            'HTTP_ACCEPT_LANGUAGE' => 'zh-CN',
            'HTTP_USER_AGENT'      => 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)',
            'HTTP_ACCEPT_ENCODING' => 'gzip, deflate',
            'HTTP_COOKIE'          => null,
            'PATH'                 => null,
            'COMSPEC'              => null,
            'PATHEXT'              => null,
            'SERVER_SIGNATURE'     => '',
            'SERVER_SOFTWARE'      => 'Apache/2.2.27 (Win32) PHP/5.4.31 mod_ssl/2.2.27 OpenSSL/0.9.8za',
            'SERVER_NAME'          => 'www.mytest.com',
            'SERVER_ADDR'          => '127.0.0.1',
            'SERVER_PORT'          => '80',
            'REMOTE_ADDR'          => '127.0.0.1',
            'REMOTE_HOST'          => '',
            'DOCUMENT_ROOT'        => realpath(__DIR__.'/../public'),
            'SERVER_ADMIN'         => 'xjx_0909@163.com',
            'SCRIPT_FILENAME'      => __FILE__,
            'REMOTE_PORT'          => '1599',
            'GATEWAY_INTERFACE'    => 'CGI/1.1',
            'SERVER_PROTOCOL'      => 'HTTP/1.0',
            'REQUEST_METHOD'       => 'GET',
            'QUERY_STRING'         => $queryString,
            'REQUEST_URI'          => '/index.php?'.$queryString,
            'SCRIPT_NAME'          => '/index.php',
            'PHP_SELF'             => '/index.php',
            'REQUEST_TIME_FLOAT'   => time().substr(microtime(), 1, 4),
            'REQUEST_TIME'         => time()
];

$url = $_SERVER['HTTPS'] == 'off' ? 'http://' : 'https://';
if (isset($_SERVER['SERVER_NAME'])) {
    $url .= $_SERVER['SERVER_NAME'];
} else {
    $url .= '127.0.0.1';
}

// 字符串querystring进行urlencode.
if (! is_empty($_SERVER['QUERY_STRING'])) {
    $args = explode('&', $_SERVER['QUERY_STRING']);
    foreach ($args as $arg) {
        list($key, $val) = explode('=', $arg);
        $_GET[$key] = $val;
    }
    
    $url .= '/index.php?'.http_build_query($_GET);
}

// 替换<br>或<br/>为cgi模式下的换行.
$result = preg_replace('#<br\s*\/?>#i', PHP_EOL, curl_get($url));
exit($result);



