<?php
/**
 * Created by PhpStorm.
 * User: opensmarty
 * Date: 18-3-21
 * Time: 下午8:39
 */
// telnet memcache 服务器 端口号
//ini_set('memcache.hash_strategy','standard');
ini_set('memcache.hash_strategy','consistent');
ini_set('memcache.hash_function','crc32');