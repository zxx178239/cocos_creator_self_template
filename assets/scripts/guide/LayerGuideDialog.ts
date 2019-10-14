/*
 * @Author: xxZhang
 * @Date: 2019-10-14 15:12:27
 * @Description: 引导弹窗类型，弱引导
 */
import UIBase from "../components/UIBase";
import { GuideMgr } from "./GuideManager";
import { UIMgr } from "../manager/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerGuideDialog extends UIBase {
    prefabUrl: string           = "guide/LayerGuideDialog";
    className: string           = "LayerGuideDialog";

    @property(cc.Label)
    labelInfo: cc.Label         = null;             // label组件

    onUILoad () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    start () {

    }

    initUI(INParams) {
        let guideInfo = INParams[0];
        this.labelInfo.string = guideInfo["desc"];
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchEnd() {
        UIMgr.popLayer(this.prefabUrl);
        GuideMgr.stepEx();
    }

    // update (dt) {}
}
