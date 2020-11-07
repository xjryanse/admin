<?php
namespace xjryanse\admin\controller;
//专门Api基类
abstract class ApiBase extends Base
{
    protected function initialize()
    {
        parent::initialize();
        //校验token
//        $this->checkToken();
    }
}