import { GuideMgr } from "./GuideManager";

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

    // update (dt) {}
}
