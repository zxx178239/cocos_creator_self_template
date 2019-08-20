/*
 * @Author: xxZhang
 * @Date: 2019-08-20 09:23:32
 * @Description: 球地图
 */

// 摆放地图坐标的映射表
let BG_POS_MAPS = [-1, 1, 0, 1, 1, 1, 
                    -1, 0, 0, 0, 1, 0, 
                    -1, -1, 0, -1, 1, -1]


const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerBg extends cc.Component {

    @property(cc.Prefab)
    subMapPrefab: cc.Prefab = null;                     // 子地图对应的prefab

    onLoad () {
        this.createBigMap();
    }

    start () {

    }

    createBigMap() {
        for(let i = 0; i < 18; i = i + 2) {
            let newNode = cc.instantiate(this.subMapPrefab);
            newNode.parent = this.node;
            newNode.position = cc.v2(this.node.width * BG_POS_MAPS[i], 
                                    this.node.height * BG_POS_MAPS[i + 1]);
        }
        this.node.width = this.node.width * 3;
        this.node.height = this.node.height * 3;
    }

    // update (dt) {}
}
