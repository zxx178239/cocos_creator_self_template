/*
 * @Author: xxZhang
 * @Date: 2019-10-21 17:22:49
 * @Description: tile map测试层
 */

const LAYER_ZORDER = {
    BG_ZORDER: 1,
    HINDER_ZORDER: 2,
    MAN_ZORDER: 50,
    TOP_ZORDER: 100,
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class LayerTileMap extends cc.Component {

    @property(cc.TiledLayer)
    topLayer: cc.TiledLayer = null;

    @property(cc.TiledLayer)
    hinderLayer: cc.TiledLayer = null;

    @property(cc.TiledLayer)
    bgLayer: cc.TiledLayer = null;

    @property(cc.Prefab)
    prefabMan: cc.Prefab = null;

    _nodeMan: cc.Node = null;


    _mapSize: cc.Size = null;
    // _tileSize: cc.Size              = null;

    onLoad() {
        this._mapSize = this.node.getComponent(cc.TiledMap).getMapSize();
        
        console.log("map size: ", this.node.getComponent(cc.TiledMap).getMapSize());
        console.log("tile size: ", this.node.getComponent(cc.TiledMap).getTileSize());
        this.topLayer.node.zIndex = LAYER_ZORDER.TOP_ZORDER;
        this.hinderLayer.node.zIndex = LAYER_ZORDER.HINDER_ZORDER;
    }

    start() {
        this.initUI();
    }

    onDestroy() {
        
    }

    initUI() {
        let subPos = this.bgLayer.getPositionAt(0, 0);
        this._nodeMan = cc.instantiate(this.prefabMan);
        this._nodeMan.parent = this.node;
        this._nodeMan.position = cc.v2(subPos.x + 20, subPos.y);
        this._nodeMan.zIndex = LAYER_ZORDER.MAN_ZORDER;
        this._nodeMan.getComponent("NodeQQMan").initParams(this.node.getComponent(cc.TiledMap), 
                                                            this.hinderLayer);
        this.addCollider();
    }

    addCollider() {
        for(let i = 0; i < this._mapSize.width; ++ i) {
            for(let j = 0; j < this._mapSize.height; ++ j) {
                let curTile = this.hinderLayer.getTileGIDAt(i, j);
                let curPos = this.hinderLayer.getPositionAt(i, j);
                // console.log("curTile: ", curTile);
                if(curTile != 0) {
                    let newCollider = this.hinderLayer.node.addComponent(cc.BoxCollider);
                    newCollider.offset.set(cc.v2(curPos.x + 20, curPos.y + 22));
                    newCollider.size.width = 40;
                    newCollider.size.height = 44;
                }
            }
        }
    }

    

    
    // update (dt) {}
}
