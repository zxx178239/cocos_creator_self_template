/*
 * @Author: xxZhang
 * @Date: 2019-08-16 15:55:04
 * @Description: 小地图实现
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerSmallCamera extends cc.Component {

    @property(cc.Node)
    nodeBall: cc.Node = null;

    @property(cc.Node)
    smallMask: cc.Node = null;

    @property(cc.Node)
    smallMap: cc.Node = null;

    @property(cc.Camera)
    smallCamera: cc.Camera = null;

    @property(cc.Sprite)
    bigSprite: cc.Sprite = null;

    onLoad () {
        let curRender = new cc.RenderTexture();
        curRender.initWithSize(2560, 1440);
        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(curRender);
        this.smallMap.getComponent(cc.Sprite).spriteFrame = spriteFrame;

        this.smallCamera.targetTexture = curRender;
        this.changeSmallMapPos();
        this.onTouchListener();
    }

    start () {

    }


    changeSmallMapPos() {
        this.smallMask.position = cc.v2(this.nodeBall.x / 5, this.nodeBall.y / 5);
    }

    onTouchListener() {
        this.nodeBall.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.nodeBall.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.nodeBall.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.nodeBall.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }
    
    onTouchStart(event) {
        let nodePos = this.nodeBall.parent.convertToNodeSpaceAR(event.getLocation());

    }

    onTouchMove(event) {
        let nodePos = this.nodeBall.parent.convertToNodeSpaceAR(event.getLocation());
        this.nodeBall.position = nodePos;
        this.changeSmallMapPos();
    }

    onTouchEnd(event) {

    }

    onTouchCancel(event) {

    }
}
