/*
 * @Author: xxZhang
 * @Date: 2019-10-31 10:30:44
 * @Description: 地图层
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerHinder extends cc.Component {

    _mapSize: cc.Size = null;

    onLoad () {
        this._mapSize = this.node.parent.getComponent(cc.TiledMap).getMapSize();
    }

    start () {
        this.addCollider();
        
    }

    addCollider() {
        let tiledComponent = this.node.getComponent(cc.TiledLayer);
        for(let i = 0; i < this._mapSize.width; ++ i) {
            for(let j = 0; j < this._mapSize.height; ++ j) {
                let curTile = tiledComponent.getTileGIDAt(i, j);
                let curPos = tiledComponent.getPositionAt(i, j);
                if(curTile != 0) {
                    let newCollider = this.node.addComponent(cc.BoxCollider);
                    newCollider.offset.set(cc.v2(curPos.x + 20, curPos.y + 22));
                    newCollider.size.width = 40;
                    newCollider.size.height = 44;
                    console.log("i, j, curTile: ", i, j, curTile);
                }
            }
        }
    }

    onCollisionEnter(self, other) {
        console.log("collider enter");
    }

    onCollisionExit() {

    }
    
    // update (dt) {}
}
