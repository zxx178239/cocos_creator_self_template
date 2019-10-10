/*
 * @Author: xxZhang
 * @Date: 2019-08-19 19:07:38
 * @Description: 球吃球游戏的主UI
 */

import { TIME_TYPES } from "../../common/GameDefine";
import { LogMgr, LOG_TAGS } from "../../manager/LogManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LayerGameUI extends cc.Component {

    @property(cc.Node)
    labelTime: cc.Node = null;

    onLoad() {
        let curTimeTick = this.labelTime.getComponent("TimeTick");
        curTimeTick.setEndCallback(() => {
            this.updateTimeEnd();
        });
        curTimeTick.setTimeTickType(TIME_TYPES.MIN_AND_SEC);
        curTimeTick.setEndTime(10);
        curTimeTick.startTimeTick();
    }

    start() {

    }

    updateTimeEnd() {
        LogMgr.log(LOG_TAGS.LOG_BALL_GAME_UI, "update time end");
    }
    // update (dt) {}
}
