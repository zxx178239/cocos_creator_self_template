/*
 * @Author: xxZhang
 * @Date: 2019-08-26 19:44:24
 * @Description: 食物节点
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class NodeFood extends cc.Component {

    onLoad () {
        console.log("food position: ", this.node.position);
    }

    start () {

    }


    onBeginContact(contact, selfCollider, otherCollider) {
        console.log("collider for food");
    }

    onEndContact(contact, selfCollider, otherCollider) {

    }

    // update (dt) {}
}
