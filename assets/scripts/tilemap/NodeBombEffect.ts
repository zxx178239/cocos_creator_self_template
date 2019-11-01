import { EventMgr } from "../manager/EventManager";
import { NOTIFY_EVENTS } from "../common/EventNotifyDefine";
import { DataMgr } from "../manager/DataManager";

/*
 * @Author: xxZhang
 * @Date: 2019-10-30 15:37:28
 * @Description: 炸弹效果
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class NodeBombEffect extends cc.Component {

    @property(cc.Prefab)
    prefabHBombEffect: cc.Prefab = null;         // 横

    @property(cc.Prefab)
    prefabVBombEffect: cc.Prefab = null;         // 竖

    @property(cc.Prefab)
    prefabUBombEffect: cc.Prefab = null;         // 上

    @property(cc.Prefab)
    prefabDBombEffect: cc.Prefab = null;         // 下

    @property(cc.Prefab)
    prefabLBombEffect: cc.Prefab = null;         // 左

    @property(cc.Prefab)
    prefabRBombEffect: cc.Prefab = null;         // 右

    @property(cc.Node)
    layoutH: cc.Node = null;

    @property(cc.Node)
    layoutV: cc.Node = null;

    _hinderLayer: cc.TiledLayer = null;

    onLoad() {
        let parentNode = this.node.parent.parent;
        this._hinderLayer = parentNode.getChildByName("layerhinder").getComponent(cc.TiledLayer);
    }

    start() {
    }

    initUI() {
        this.layoutH.destroyAllChildren();
        this.layoutV.destroyAllChildren();


        let bombPower = DataMgr.getDataBombMan().getBombPower();
        let num = this.calNumsByPower(bombPower);
        // this.calHRealNums(num);
        // this.calVRealNums(num);
        // this.calRealNums();
        this.addChildNodes(this.layoutH, this.prefabLBombEffect,
            this.prefabRBombEffect, this.prefabHBombEffect, this.calHRealNums(num));
        this.addChildNodes(this.layoutV, this.prefabUBombEffect,
            this.prefabDBombEffect, this.prefabVBombEffect, this.calVRealNums(num));
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

    addChildNodes(INParent, INPrefab1, INPrefab2, INPrefab3, INNums) {
        let value1 = INNums[0];
        let value2 = INNums[1];

        let totalNum = value1 + value2 + 1;
        console.log("totalNums: ", value1, value2, totalNum);
        for(let i = 0; i < totalNum; ++ i) {
            if(i === 0) {
                let newNode = cc.instantiate(INPrefab1);
                INParent.addChild(newNode);
            }else if(i === totalNum - 1) {
                let newNode = cc.instantiate(INPrefab2);
                INParent.addChild(newNode);
            }else {
                let newNode = cc.instantiate(INPrefab3);
                INParent.addChild(newNode);
            }
        }
    }

    calNumsByPower(INPower) {
        return 3;
        // let nums = 0;
        // switch (INPower) {
        //     case 1:
        //         nums = 1;
        //         break;
        //     case 2:
        //         nums = 3;
        //         break;
        //     case 3:
        //         nums = 5;
        //     default:
        //         nums = 7;
        //         break;
        // }
        // return nums;
    }

    calHRealNums(INOldNums) {
        let splitNum = Math.floor(INOldNums / 2);
        let tilePos = this.calTilePos();
        let newH = 0;
        let newL = 0;
        let newR = 0;
        let newV = 0;

        // 计算横向最大宽度
        // 向左
        let i = 0;
        for (i = 0; i < splitNum; ++i) {
            let newX = tilePos.x - i - 1;
            if (newX < 0) {
                break;
            }
            let curTile = this._hinderLayer.getTileGIDAt(newX, tilePos.y);
            if (curTile) {
                break;
            }
        }
        if (i !== splitNum)
            newL = splitNum - i - 1;
        else
            newL = splitNum;

        // 向右
        for (i = 0; i < splitNum; ++i) {
            let newX = tilePos.x + i + 1;
            if (newX >= 15) {
                break;
            }
            let curTile = this._hinderLayer.getTileGIDAt(newX, tilePos.y);
            if (curTile) {
                break;
            }
        }
        if (i !== splitNum)
            newR = splitNum - i - 1;
        else
            newR = splitNum;

        // console.log("l, r: ", newL, newR);

        return [newL, newR];
    }

    calVRealNums(INOldNums) {
        let splitNum = Math.floor(INOldNums / 2);
        let tilePos = this.calTilePos();
        let newH = 0;
        let newV = 0;
        let newU = 0;
        let newD = 0;
        let i = 0;
        // 计算纵向最大宽度
        // 向上
        for (i = 0; i < splitNum; ++i) {
            let newY = tilePos.y + i + 1;
            if (newY >= 14) {
                break;
            }
            let curTile = this._hinderLayer.getTileGIDAt(tilePos.x, newY);
            if (curTile) {
                break;
            }
        }
        if (i !== splitNum)
            newU = splitNum - i - 1;
        else
            newU = splitNum;

        // 向下
        for (i = 0; i < splitNum; ++i) {
            let newY = tilePos.y - i - 1;
            if (newY < 0) {
                break;
            }
            let curTile = this._hinderLayer.getTileGIDAt(tilePos.x, newY);
            if (curTile) {
                break;
            }
        }
        if (i !== splitNum)
            newD = splitNum - i - 1;
        else
            newD = splitNum;

        // console.log("u, d: ", newU, newD);
        return [newU, newD];
    }

    calTilePos() {
        let diffX = Math.ceil(this.node.x / 40);
        let diffY = Math.ceil(this.node.y / 44);
        diffY = 14 - diffY;
        // diffY = diffY + 1;
        return cc.v2(diffX - 1, diffY);
    }
    // update (dt) {}
}
