<?php
namespace xjryanse\admin\controller;

use think\facade\Request;
//前台基类
abstract class FrontBase extends Base
{
    /**
     * 空方法渲染模板
     * @param type $name
     * @return type
     */
    public function _empty($name)
    {
        $controller = strtolower( Request::controller() );
        return $this->fetch( $controller . '/' . $name);        
    }
}
