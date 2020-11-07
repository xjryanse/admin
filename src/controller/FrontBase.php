<?php
namespace xjryanse\admin\controller;

use think\facade\Request;
use xjryanse\logic\WxBrowser;
//前台基类
abstract class FrontBase extends Base
{
    protected $isWxBrowser;
    //后台基本类
    use \xjryanse\traits\WePubAuthTrait;
    
    protected function initialize()
    {
        parent::initialize();
        //后台参数初始化
        $this->initWePubAuth();
        //是否微信浏览器
        $this->isWxBrowser = WxBrowser::isWxBrowser();
        $this->assign( 'isWxBrowser' , $this->isWxBrowser );
        //微信JsSdk参数渲染到页面
        if($this->isWxBrowser){
            //获取微信jssdk参数，并渲染到页面
            $this->getWxJsSdkParams();
        }
    }
    /**
     * 获取微信jssdk参数，并渲染到页面
     */
    protected function getWxJsSdkParams()
    {
        $wePubJsSdkParam = $this->wePubFans->getWxJsSdkParams();
        //微信分享参数
        $this->assign('wePubJsSdkParam',$wePubJsSdkParam );
    }
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
