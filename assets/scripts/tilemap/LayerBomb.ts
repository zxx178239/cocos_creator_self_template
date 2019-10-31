import { EventMgr } from "../manager/EventManager";
import { NOTIFY_EVENTS } from "../common/EventNotifyDefine";

/*
 * @Author: xxZhang
 * @Date: 2019-10-31 10:17:26
 * @Description: 炸弹层
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerBomb extends cc.Component {

    @property(cc.Prefab)
    prefabBomb: cc.Prefab           = null;

    private _bombPool: cc.NodePool  = new cc.NodePool();
    private _layerHinder: cc.TiledLayer         = null;         // 碰撞层
    private _layerBg: cc.TiledLayer             = null;         // 背景层
    private _layerMap: cc.TiledMap              = null;         // 地图层
    private _tileMapSize: cc.Size               = null;         // 地图的尺寸
    private _tileSize: cc.Size                  = null;         // 格子的大小

    onLoad () {
        this._layerHinder = this.node.parent.getChildByName("layerhinder").getComponent(cc.TiledLayer);
        this._layerMap = this.node.parent.getComponent(cc.TiledMap);
        this._layerBg = this.node.parent.getChildByName("layerbg").getComponent(cc.TiledLayer);

        this._tileMapSize = this._layerMap.getMapSize();
        console.log("tileMapSize: ", this._tileMapSize);
        this._tileSize = this._layerMap.getTileSize();
    
        this.registerEvent();
    }

    start () {

    }

    onDestroy() {
        this.removeEvent();
    }

    registerEvent() {
        EventMgr.addEventListener(NOTIFY_EVENTS.CREATE_BOMB, this.createBomb.bind(this));
        EventMgr.addEventListener(NOTIFY_EVENTS.DESTROY_BOMB, this.destroyBomb.bind(this));
    }

    removeEvent() {
        EventMgr.removeEventListener(NOTIFY_EVENTS.CREATE_BOMB, this.createBomb.bind(this));
        EventMgr.removeEventListener(NOTIFY_EVENTS.DESTROY_BOMB, this.destroyBomb.bind(this));
    }

    createBomb(INPos) {
        let tilePos = this.calTilePos(INPos.x, INPos.y);
        let newPos = cc.v2(tilePos.x - 20, tilePos.y);
        if(this.searchBombInLayer(newPos)) {
            console.log("find bomb");
            return;
        }

        let newBomb = null;
        if(this._bombPool.size() > 0) {
            newBomb = this._bombPool.get();
        }else {
            newBomb = cc.instantiate(this.prefabBomb);
        }
        
        newBomb.parent = this.node;
        newBomb.position = newPos;
        newBomb.getComponent("NodeBomb").playBomb();
    }

    destroyBomb(INNode) {
        this._bombPool.put(INNode);
    }


    calTilePos(INPosX, INPosY) {
        let diffX = Math.ceil(INPosX / this._tileSize.width);
        let diffY = Math.ceil(INPosY / this._tileSize.height);
        diffY = this._tileMapSize.height - diffY;
        return this._layerBg.getPositionAt(cc.v2(diffX, diffY));
    }

    searchBombInLayer(INPos) {
        for(let i = 0; i < this.node.childrenCount; ++ i) {
            let curChild = this.node.children[i];
            if(Math.abs(curChild.x - INPos.x) < 1 &&
                Math.abs(curChild.y - INPos.y) < 1 ) {
                return true;
            }
        }
        return false;
    }

    // update (dt) {}
}
