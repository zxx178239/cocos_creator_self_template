import { GuideMgr } from "./GuideManager";
import { inherits } from "util";
import { UIMgr } from "../manager/UIManager";
import { GuideCheckMgr } from "./GuideCheckManager";
import { GuideConditions } from "./GuideConst";

/*
 * @Author: xxZhang
 * @Date: 2019-10-14 15:05:08
 * @Description: guide场景
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class GuideScene extends cc.Component {

    @property(cc.Label)
    labelLevel: cc.Label = null;

    _level: any       = 1;

    onLoad () {
        GuideMgr.syncFromServer();
        GuideMgr.addUI("guidescene", this.node);
        this.schedule(this.changeLevel, 1);
    }

    start () {

    }

    onPressButton(event, custom) {
        let intValue = parseInt(custom);

        if(intValue === 0) {
            UIMgr.pushLayer("startpopui/LayerSignin");
        }else if(intValue === 1) {
            UIMgr.pushLayer("startpopui/LayerActivity");
        }else if(intValue === 2) {
            UIMgr.pushLayer("startpopui/LayerGift");
        }
    }

    changeLevel() {
        this._level ++;
        this.labelLevel.string = this._level;
        GuideCheckMgr.checkGuide(GuideConditions.LEVEL_TEN_CONDITION, this._level);
        if(this._level >= 10) {
            this.unschedule(this.changeLevel);
        }
    }

    // update (dt) {}
}
