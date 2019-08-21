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
    _refNodeWidth: number   = 0;                // 参考的宽度
    _refNodeHeight: number  = 0;                // 参考的高度

    onLoad () {
        let layerGameUI = this.node.parent.getChildByName("LayerGameUI");
        this._rockingScript = layerGameUI.getChildByName("NodeRockingBar").getComponent("NodeRockingBar");
    }

    start () {

    }

    onDestroy() {
    }

    setRefValues(INWidth, INHeight) {
        this._refNodeWidth = INWidth;
        this._refNodeHeight = INHeight;
    }

    update(dt) {
        let moveDir = this._rockingScript.getMoveDir();
        if(moveDir.mag() < 0.5) {
            return;
        }
        LogMgr.log(LOG_TAGS.LOG_BALL_GAME_UI, "INDir mag: ", moveDir.mag());
        let diffX = moveDir.x * this._speed;
        let diffY = moveDir.y * this._speed;

        let tmpX = this.node.x + diffX * dt;
        let moveAlign = Math.abs((this._refNodeWidth - cc.winSize.width)) / 2;
        tmpX = this.getRightValue(tmpX, moveAlign);
        let tmpY = this.node.y + diffY * dt;
        moveAlign = Math.abs((this._refNodeHeight - cc.winSize.height)) / 2;
        
        tmpY = this.getRightValue(tmpY, moveAlign);
        this.node.x = tmpX;
        this.node.y = tmpY;
    }

    getRightValue(INTmpValue, INMoveAlign) {

        if (INTmpValue <= -INMoveAlign) {
            return -INMoveAlign;
        } else if (INTmpValue >= INMoveAlign) {
            return INMoveAlign;
        } else {
            return INTmpValue;
        }
    }

}
