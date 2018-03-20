<?php
/**
 * Created by PhpStorm.
 * User: opensmarty
 * Date: 18-3-19
 * Time: 下午11:41
 */
$so = scws_new();
$so->set_charset('gbk');
// 这里没有调用 set_dict 和 set_rule 系统会自动试调用 ini 中指定路径下的词典和规则文件
$so->send_text("我是一个中国人,我会C++语言,我也有很多T恤衣服");
while ($tmp = $so->get_result())
{
    print_r($tmp);
}
$so->close();