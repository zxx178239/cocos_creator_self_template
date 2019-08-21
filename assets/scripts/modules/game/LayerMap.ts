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

    @property(cc.Node)
    bgCameraNode: cc.Node   = null;                     // 背景摄像机节点

    onLoad () {
        this.createBigMap();
    }

    start () {

    }

    createBigMap() {
        let _width = 0;
        let _height = 0;
        for(let i = 0; i < 18; i = i + 2) {
            let newNode = cc.instantiate(this.subMapPrefab);
            newNode.parent = this.node;
            newNode.position = cc.v2(newNode.width * BG_POS_MAPS[i], 
                                    newNode.height * BG_POS_MAPS[i + 1]);
            _width = newNode.width;
            _height = newNode.height;
        }
        this.node.width = _width * 3;
        this.node.height = _height * 3;

        this.bgCameraNode.getComponent("LayerBgCamera").setRefValues(this.node.width,
                                                                    this.node.height);
    }

    // update (dt) {}
}
