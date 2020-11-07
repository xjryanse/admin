<?php
namespace xjryanse\admin\controller;
//后台基类
abstract class AdminBase extends Base
{
    use \xjryanse\traits\BaseAdminTrait;
    
    protected function initialize()
    {
        parent::initialize();
        //后台参数初始化
        $this->initAdminParamSet();
        //后台参数渲染
        $this->initAdminAssign();
    }
}