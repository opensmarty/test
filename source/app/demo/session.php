<?php
/**
 * Created by PhpStorm.
 * User: opensmarty
 * Date: 18-3-21
 * Time: 下午6:19
 */
//初始化session
ini_set('session.cookie_domain', 'mytest.com');
ini_set("session.save_handler", "memcache");
ini_set("session.save_path", "tcp://localhost:11211");

//测试session读取是否正常
session_start();
if(!isset($_SESSION['username'])){
    $_SESSION['username'] = "admin";
    $_SESSION['password'] = "!@#$%";
}

// 测试sessionId
echo session_id()."<br/>";
output($_SESSION);
echo "----<br />";

//用 sessionid 去 memcached 里查询一下
$m = new Memcache();
$m->connect('localhost', 11211);
output($m->get(session_id()));


//$m->add('name', 'os');
//echo '---';
//output($m->get('name'));
//或者这样
//$mem->addServer("127.0.0.1", 11211) or die ("Can't add Memcache server 127.0.0.1:12000");

//根据session_id获取数据

//本机
//$session = $m->get(session_id()); //session_id：d527b6f983bd5e941f9fff318a31206b

//另一台服务器，已知session id
//$session = $m->get("d527b6f983bd5e941f9fff318a31206b");
//
//echo $session."<br/>"; //会得到这样的数据：username|s:16:"pandao";，解析一下就可以得到相应的值了
//echo session_id()."<br/>";
//exit;

