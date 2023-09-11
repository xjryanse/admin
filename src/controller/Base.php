<?php
namespace xjryanse\admin\controller;

use think\Controller;
use xjryanse\user\logic\SessionLogic;
use xjryanse\system\service\SystemLogService as LogService;
use xjryanse\system\service\SystemMethodService;
use Exception;
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
        // 2022-12-15权限校验
        if(!SystemMethodService::hasAuth()){
            throw new Exception('您没有该接口的访问权限'.SystemMethodService::getMethodId());
        }
        //公共参数初始化
        $this->initWebParamSet();
        //公共参数写页面
        //$this->initWebAssign();
    }

}