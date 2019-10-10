import { ResMgr } from "../../manager/ResManager";

/*
 * @Author: xxZhang
 * @Date: 2019-08-21 09:38:53
 * @Description: 球节点
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class NodeBall extends cc.Component {

    _isSelfBall: boolean    = false;
    _bgCamera: cc.Node      = null;             // 背景摄像机

    @property(cc.Sprite)
    spriteBall: cc.Sprite   = null;             // 球图片


    onLoad () {
        let sceneCanvas = cc.director.getScene().getChildByName("Canvas");
        this._bgCamera = sceneCanvas.getChildByName("BgCamera");
    }

    start () {

    }

    initBall(INFlag) {
        this._isSelfBall = INFlag;
        ResMgr.replaceSprite(this.spriteBall.node, "balls/sprite_ball_1");
    }

    update() {
        if(!this._isSelfBall) {
            this.doOther();
        }else {
            this.doForSelf();
        }
    }

    doForSelf() {
        this.node.position = this._bgCamera.position;
        // console.log("this.node.position: ", this.node.position);
    }

    doOther() {

    }

    onBeginContact(contact, selfCollider, otherCollider) {
        console.log("collider for ball");
    }

    onEndContact(contact, selfCollider, otherCollider) {

    }

    // update (dt) {}
}
