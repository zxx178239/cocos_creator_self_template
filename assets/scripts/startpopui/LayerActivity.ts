import { EventMgr } from "../manager/EventManager";
import { NOTIFY_EVENTS } from "../common/EventNotifyDefine";
import UIBase from "../components/UIBase";
import { UIMgr } from "../manager/UIManager";

/*
 * @Author: xxZhang
 * @Date: 2019-10-10 10:15:49
 * @Description: 启动弹窗的通用脚本
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerActivity extends UIBase {
    prefabUrl: string           = "startpopui/LayerActivity";
    className: string           = "LayerActivity";

    onUILoad () {
        
    }

    start () {

    }

    initUI() {
        
    }

    // update (dt) {}

    onPressClose() {
        UIMgr.popLayer(this.prefabUrl);
        EventMgr.dispatchEvent(NOTIFY_EVENTS.START_POP_UI_NOTIFY);
    }
}
