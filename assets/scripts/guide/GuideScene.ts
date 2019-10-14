import { GuideMgr } from "./GuideManager";
import { inherits } from "util";
import { UIMgr } from "../manager/UIManager";

/*
 * @Author: xxZhang
 * @Date: 2019-10-14 15:05:08
 * @Description: guide场景
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class GuideScene extends cc.Component {

    onLoad () {
        GuideMgr.syncFromServer();
        GuideMgr.addUI("guidescene", this.node);
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

    // update (dt) {}
}
