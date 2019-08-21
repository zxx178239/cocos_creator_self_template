/*
 * @Author: xxZhang
 * @Date: 2019-08-20 09:23:39
 * @Description: 游戏的摄像机层
 */

import { LogMgr, LOG_TAGS } from "../../manager/LogManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerBgCamera extends cc.Component {

    _speed: number          = 100;
    _rockingScript          = null;             // 摇杆脚本

    onLoad () {
        let layerGameUI = this.node.parent.getChildByName("LayerGameUI");
        this._rockingScript = layerGameUI.getChildByName("NodeRockingBar").getComponent("NodeRockingBar");
    }

    start () {

    }

    onDestroy() {
    }

    update(dt) {
        console.log("dt: ", dt);
        let moveDir = this._rockingScript.getMoveDir();
        if(moveDir.mag() < 0.5) {
            return;
        }
        LogMgr.log(LOG_TAGS.LOG_BALL_GAME_UI, "INDir mag: ", moveDir.mag());
        let diffX = moveDir.x * this._speed;
        let diffY = moveDir.y * this._speed;
        this.node.x = this.node.x + diffX * dt;
        this.node.y = this.node.y + diffY * dt;
    }

}
