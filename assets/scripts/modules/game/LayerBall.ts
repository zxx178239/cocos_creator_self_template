/*
 * @Author: xxZhang
 * @Date: 2019-08-21 09:46:02
 * @Description: 球层
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerBall extends cc.Component {

    @property(cc.Prefab)
    ballPrefab: cc.Prefab = null;               // 球预制体


    onLoad () {
        this.createBalls();
    }

    start () {

    }

    createBalls() {
        for(let i = 0; i < 4; ++ i) {
            let newBall = cc.instantiate(this.ballPrefab);
            newBall.parent = this.node;
            newBall.position = cc.v2(Math.random() * 1000, Math.random() * 400);
        }
        this.node.children[0].getComponent("NodeBall").initBall(true);
    }

    // update (dt) {}
}
