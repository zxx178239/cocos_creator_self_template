/*
 * @Author: xxZhang
 * @Date: 2019-10-28 19:58:41
 * @Description: 地图场景
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class TileMapScene extends cc.Component {

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    }

    start () {

    }

    // update (dt) {}
}
