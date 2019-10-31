/*
 * @Author: xxZhang
 * @Date: 2019-10-21 17:22:49
 * @Description: tile map测试层
 */

// const LAYER_ZORDER = {
//     LAYER_BOMB_EFFECT: 10,
//     LAYER_BOMB: 20,
//     LAYER_PLAYER: 50,
// }

const { ccclass, property } = cc._decorator;

@ccclass
export default class LayerTileMap extends cc.Component {

    // @property(cc.Node)
    // layerBomb: cc.Node                  = null;

    // @property(cc.Node)
    // layerBombEffect: cc.Node            = null;

    // @property(cc.Node)
    // layerPlayer: cc.Node                = null;

    onLoad() {
        // this.layerPlayer.zIndex     = LAYER_ZORDER.LAYER_PLAYER;
        // this.layerBomb.zIndex       = LAYER_ZORDER.LAYER_BOMB;
        // this.layerBombEffect.zIndex = LAYER_ZORDER.LAYER_BOMB_EFFECT;
    }

    start() {
    }

    onDestroy() {
        
    }

    
    // update (dt) {}
}
