<?php
namespace xjryanse\admin\controller;
//专门Api基类
abstract class ApiBase extends Base
{
    //返回值复用类
    use \xjryanse\traits\ResponseTrait;
    
    protected function initialize()
    {
        parent::initialize();
        //校验token
//        $this->checkToken();
    }
}