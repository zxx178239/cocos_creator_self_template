import { EventMgr } from "../manager/EventManager";
import { NOTIFY_EVENTS } from "../common/EventNotifyDefine";

/*
 * @Author: xxZhang
 * @Date: 2019-10-31 10:17:32
 * @Description: 爆炸效果层
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class LayerBombEffect extends cc.Component {

    @property(cc.Prefab)
    prefabBombEffect: cc.Prefab = null;

    _bombEffectPool: cc.NodePool    = new cc.NodePool();

    onLoad() {
        this.registerEvent();
    }

    start() {

    }

    onDestroy() {
        this.removeEvent();
    }

    registerEvent() {
        EventMgr.addEventListener(NOTIFY_EVENTS.CREATE_BOMB_EFFECT, this.createBombEffect.bind(this));
        EventMgr.addEventListener(NOTIFY_EVENTS.DESTROY_BOMB_EFFECT, this.destroyBombEffect.bind(this));
    }

    removeEvent() {
        EventMgr.removeEventListener(NOTIFY_EVENTS.DESTROY_BOMB_EFFECT, this.createBombEffect.bind(this));
        EventMgr.removeEventListener(NOTIFY_EVENTS.DESTROY_BOMB_EFFECT, this.destroyBombEffect.bind(this));
    }

    createBombEffect(INPos) {
        let newBombEffect = null;

        if(this._bombEffectPool.size() > 0) {
            newBombEffect = this._bombEffectPool.get();
        }else {
            newBombEffect = cc.instantiate(this.prefabBombEffect);
        }
        INPos = cc.v2(INPos.x, INPos.y + 22);
        newBombEffect.parent = this.node;
        newBombEffect.position = INPos;

        newBombEffect.getComponent("NodeBombEffect").initUI();
    }

    destroyBombEffect(INNode) {
        this._bombEffectPool.put(INNode);
    }

    // update (dt) {}
}
