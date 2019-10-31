import { EventMgr } from "../manager/EventManager";
import { NOTIFY_EVENTS } from "../common/EventNotifyDefine";

/*
 * @Author: xxZhang
 * @Date: 2019-10-30 13:55:33
 * @Description: 炸弹节点
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class NodeBomb extends cc.Component {

    @property(cc.Prefab)
    prefabBombEffect: cc.Prefab         = null;

    private _playNums: number           = 3;

    onLoad () {}

    start () {
    }

    playBomb() {
        let animationComponent = this.node.getComponent(cc.Animation);
        let animState = animationComponent.play("bomb");
        animState.repeatCount = this._playNums;

        animationComponent.on("finished", this.playEnd, this);
    }

    playEnd() {
        console.log("play end");
        EventMgr.dispatchEvent(NOTIFY_EVENTS.DESTROY_BOMB, this.node);
        EventMgr.dispatchEvent(NOTIFY_EVENTS.CREATE_BOMB_EFFECT, this.node.position);
    }
    // update (dt) {}
}
