import { UIMgr } from "../manager/UIManager";
import { EventMgr } from "../manager/EventManager";
import { NOTIFY_EVENTS } from "../common/EventNotifyDefine";

/*
 * @Author: xxZhang
 * @Date: 2019-10-10 09:42:44
 * @Description: 启动场景实现记录
 */

 // 弹窗列表
const POPUI_LIST = {
    ACTIVITY_PREFAB: "startpopui/LayerActivity",                        // 活动的prefab
    SIGNIN_PREFAB: "startpopui/LayerSignin",                            // 签到的prefab
    GIFT_PREFAB: "startpopui/LayerGift",                                // 礼包弹窗

}


const {ccclass, property} = cc._decorator;

@ccclass
export default class StartPopUI extends cc.Component {

    _popuiList = [];                     // 弹窗列表

    onLoad () {
        EventMgr.addEventListener(NOTIFY_EVENTS.START_POP_UI_NOTIFY, this.showNextPopUI.bind(this));
    }

    start () {
        this.initPopUIList();
    }

    onDestroy() {
        EventMgr.removeEventListener(NOTIFY_EVENTS.START_POP_UI_NOTIFY, this.showNextPopUI.bind(this));
    }

    /**
     * @description: 初始化显示初始弹窗的列表
     * @param : 
     * @return : 
     */
    initPopUIList() {
        // 活动弹窗
        if(this._isNeedActivity()) {
            this._popuiList.push(POPUI_LIST.ACTIVITY_PREFAB);
        }

        // 签到弹窗
        if(this._isNeedSignin()) {
            this._popuiList.push(POPUI_LIST.SIGNIN_PREFAB);
        }

        // 礼包弹窗
        if(this._isNeedGift()) {
            this._popuiList.push(POPUI_LIST.GIFT_PREFAB);
        }

        this.showNextPopUI();
    }

    /**
     * @description: 展示下一个弹窗
     * @param : 
     * @return : 
     */
    showNextPopUI() {
        if(this._popuiList.length <= 0) {
            return;
        }

        let curPrefab = this._popuiList.shift();
        UIMgr.pushLayer(curPrefab);
    }

    /**
     * @description: 判断是否有活动
     * @param : 
     * @return : 
     */
    _isNeedActivity() {
        return true;
    }

    /**
     * @description: 判断是否有签到
     * @param : 
     * @return : 
     */
    _isNeedSignin() {
        return false;
    }

    /**
     * @description: 判断是否有礼包
     * @param : 
     * @return : 
     */
    _isNeedGift() {
        return true;
    }
    // update (dt) {}
}
