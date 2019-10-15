import { GuideMgr } from "./GuideManager";
import { UIMgr } from "../manager/UIManager";

/*
 * @Author: xxZhang
 * @Date: 2019-10-15 11:07:38
 * @Description: 等级按钮
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class NodeLevel extends cc.Component {

    @property(cc.Node)
    buttonLevel: cc.Node            = null;

    onLoad () {
        cc.systemEvent.on("level_unlock", this.unlockLevelButton, this);
    }

    start () {

    }

    unlockLevelButton() {
        cc.systemEvent.off("level_unlock", this.unlockLevelButton, this);
        this.buttonLevel.active = true;
        GuideMgr.doGuideForCondition(10);
    }

    onPressButton() {
        UIMgr.pushLayer("guide/LayerLevel");
    }

    // update (dt) {}
}
