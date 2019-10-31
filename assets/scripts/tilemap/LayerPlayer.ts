/*
 * @Author: xxZhang
 * @Date: 2019-10-31 10:17:18
 * @Description: 人物层，控制当前场景中的所有的人物，自己、对手、怪物等
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerPlayer extends cc.Component {

    @property(cc.Prefab)
    prefabPlayer: cc.Prefab             = null;         // 人物预制体

    private _playerPool: cc.NodePool            = new cc.NodePool();
    private _playerIndex: number                = 0;            // 人物的索引
    private _layerHinder: cc.TiledLayer         = null;         // 碰撞层
    private _layerBg: cc.TiledLayer             = null;         // 背景层
    private _layerMap: cc.TiledMap              = null;         // 地图层

    onLoad () {
        this._layerHinder = this.node.parent.getChildByName("layerhinder").getComponent(cc.TiledLayer);
        this._layerMap = this.node.parent.getComponent(cc.TiledMap);
        this._layerBg = this.node.parent.getChildByName("layerbg").getComponent(cc.TiledLayer);
    }

    start () {
        this.createPlayer();
    }

    // update (dt) {}


    createPlayer() {
        let newPlayer = null;
        if(this._playerPool.size() > 0) {
            newPlayer = this._playerPool.get();
        }else {
            newPlayer = cc.instantiate(this.prefabPlayer);
        }

        let subPos = this._layerBg.getPositionAt(0, 0);
        
        newPlayer.parent = this.node;
        newPlayer.position = cc.v2(subPos.x + 20, subPos.y);
    }

    diePlayer(INNode) {
        this._playerPool.put(INNode);
    }
}
