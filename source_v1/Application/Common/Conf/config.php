<?php
return [//'配置项'=>'配置值'
        //数据库配置信息
        'DB_TYPE'            => 'mysql', // 数据库类型
        'DB_HOST'            => 'localhost', // 服务器地址
        'DB_NAME'            => 'test', // 数据库名
        'DB_USER'            => 'root', // 用户名
        'DB_PWD'             => 'os2017@db', // 密码
        'DB_PORT'            => 3306, // 端口
        'DB_PREFIX'          => 'think_', // 数据库表前缀
        'DB_CHARSET'         => 'utf8', // 字符集
        'DB_DEBUG'           => true, // 数据库调试模式 开启后可以记录SQL日志 3.2.3新增

        //路由配置信息
        'URL_ROUTER_ON'      => true, //开启路由
        'URL_MODEL'          => '2', //url访问模式为rewrite模式
        'URL_HTML_SUFFIX'    => '.html', //开启伪静态
        'URL_ROUTE_RULES'    => [ //定义路由规则
                                  'form/:id\d' => 'Home/Form/edit'
        ],

        //SESSION设置
        'SESSION_AUTO_START' => true, //是否开启session
        //    'SESSION_OPTIONS'       =>  array(), // session 配置数组 支持type name id path expire domain 等参数
        'SESSION_TYPE'       => 'memcache', // session hander类型 默认无需设置 除非扩展了session hander驱动
        'SESSION_PREFIX'     => 'think_', // session 前缀

        'USER_CONFIG'       => ['USER_AUTH' => true,
                                'USER_TYPE' => 3,
        ],

        // 设置禁止访问的模块列表
        'DEFAULT_MODULE'    => 'Home', //默认模块
        'MODULE_DENY_LIST'  => ['Common', 'Runtime'],
        'MODULE_ALLOW_LIST' => ['Home', 'Admin', 'User'],

        'VAR_MODULE'     => 'm',
        'VAR_CONTROLLER' => 'c',
        'VAR_ACTION'     => 'a',

        //更多配置参数

];