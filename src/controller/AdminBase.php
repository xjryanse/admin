<?php
namespace xjryanse\admin\controller;
//后台基类
abstract class AdminBase extends Base
{
    //返回值复用类
    use \xjryanse\traits\ResponseTrait;
    //TODO queryCon方法拆离
    use \xjryanse\traits\ModelTrait;
    //后台基本类
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