import { EventMgr } from "../manager/EventManager";
import { NOTIFY_EVENTS } from "../common/EventNotifyDefine";
import { DataMgr } from "../manager/DataManager";

/*
 * @Author: xxZhang
 * @Date: 2019-10-30 15:37:28
 * @Description: 炸弹效果
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class NodeBombEffect extends cc.Component {

    @property(cc.Prefab)
    prefabHBombEffect: cc.Prefab            = null;         // 横

    @property(cc.Prefab)
    prefabVBombEffect: cc.Prefab            = null;         // 竖

    @property(cc.Prefab)
    prefabUBombEffect: cc.Prefab            = null;         // 上

    @property(cc.Prefab)
    prefabDBombEffect: cc.Prefab            = null;         // 下

    @property(cc.Prefab)
    prefabLBombEffect: cc.Prefab            = null;         // 左

    @property(cc.Prefab)
    prefabRBombEffect: cc.Prefab            = null;         // 右

    @property(cc.Node)
    layoutH: cc.Node                        = null;

    @property(cc.Node)
    layoutV: cc.Node                        = null;

    _hinderLayer: cc.TiledLayer             = null;

    onLoad () {}

    start () {
    }

    initUI() {
        this.layoutH.destroyAllChildren();
        this.layoutV.destroyAllChildren();

        this.addChildNodes(this.layoutH, this.prefabLBombEffect,
                        this.prefabRBombEffect, this.prefabHBombEffect);
        this.addChildNodes(this.layoutV, this.prefabUBombEffect,
                        this.prefabDBombEffect, this.prefabVBombEffect);
        this.doDisappearAction();
    }

    doDisappearAction() {
        this.node.opacity = 255;
        let action1 = cc.fadeOut(1);
        let action2 = cc.callFunc(() => {
            EventMgr.dispatchEvent(NOTIFY_EVENTS.DESTROY_BOMB_EFFECT, this.node);
        })

        this.node.runAction(cc.sequence(action1, action2));
    }

    addChildNodes(INParent, INPrefab1, INPrefab2, INPrefab3) {
        let bombPower = DataMgr.getDataBombMan().getBombPower();
        let nums = this.calNumsByPower(bombPower);

        let newNode = cc.instantiate(INPrefab1);
        INParent.addChild(newNode);
        for(let i = 0; i < nums; ++ i) {
            newNode = cc.instantiate(INPrefab3);
            INParent.addChild(newNode);
        }
        newNode = cc.instantiate(INPrefab2);
        INParent.addChild(newNode);
    }

    calNumsByPower(INPower) {
        let nums = 0;
        switch (INPower) {
            case 1:
                nums = 1;
                break;
            case 2:
                nums = 3;
                break;
            case 3:
                nums = 5;
            default:
                nums = 7;
                break;
        }
        return nums;
    }
    // update (dt) {}
}
