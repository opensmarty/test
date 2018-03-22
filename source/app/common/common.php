<?php
/**
 * Created by PhpStorm.
 * User: opensmarty
 * Date: 18-3-13
 * Time: 下午10:27
 */
// 设置错误报告。
ini_set('display_errors', 0); // 设置为0可避免显示重复的错误提示。
error_reporting(E_ALL);

//初始化系统配置
//系统初始化session，支持memcache缓存；默认系统支持文件缓存。
ini_set('session.cookie_domain', 'mytest.com');
ini_set("session.save_handler", "memcache");
ini_set("session.save_path", "tcp://localhost:11211");

ini_set('memcache.hash_strategy','consistent');
ini_set('memcache.hash_function','crc32');

// 初始化系统常量
define('APP_PATH', ROOT_PATH . '/app');
define('PUBLIC_PATH', ROOT_PATH.'/public');
define('DEFAULT_EXT', '.php');

require_once APP_PATH.'/common/config.php';
require_once APP_PATH.'/common/function.php';
