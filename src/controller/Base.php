<?php
namespace xjryanse\admin\controller;

use think\Controller;
use xjryanse\user\logic\SessionLogic;
use xjryanse\system\service\SystemLogService as LogService;

/**
 * 后台框架基类
 */
abstract class Base extends Controller
{
    use \xjryanse\traits\DebugTrait;   
    use \xjryanse\traits\RequestTrait;
    use \xjryanse\traits\BaseWebTrait;
    
    protected function initialize()
    {
        //session初始化
        SessionLogic::sessionInit();
        //记录访问日志
        LogService::log();        
        //公共参数初始化
        $this->initWebParamSet();
        //公共参数写页面
        $this->initWebAssign();
    }

}