/*
 * @Author: xxZhang
 * @Date: 2019-08-20 15:50:37
 * @Description: 摇杆组件
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class NodeRochingBar extends cc.Component {

    @property(cc.Node)
    spriteRockNode: cc.Node         = null;

    private _lastPosition: cc.Vec2  = cc.v2(0, 0);

    onLoad () {
        this.registerTouchListener();
    }

    start () {

    }

    registerTouchListener() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    onTouchStart(event) {
        let worldPos = event.getLocation();
        let curPos = this.node.convertToNodeSpaceAR(worldPos);
        this.spriteRockNode.active = true;
        this.spriteRockNode.rotation = this.getRotateAngle(this._lastPosition);
        this._lastPosition = curPos;
        this.spriteRockNode.position = this.getArrowLoc();
    }

    onTouchMove(event) {
        let curWorldPos = event.getLocation();
        let curPos = this.node.convertToNodeSpaceAR(curWorldPos);
        this.spriteRockNode.rotation = this.getRotateAngle(this._lastPosition);
        this._lastPosition = curPos;
        this.spriteRockNode.position = this.getArrowLoc();
    }

    onTouchEnd(event) {
        this.spriteRockNode.active = false;
    }

    onTouchCancel(event) {
        this.spriteRockNode.active = false;
    }

    getRotateAngle(INCurPos) {
        let dir = cc.v2(INCurPos.x - this._lastPosition.x, INCurPos.y - this._lastPosition.y);
        let angle = dir.signAngle(cc.v2(1, 0));
        let degree = angle / Math.PI * 180;
        return degree;
    }

    getArrowLoc() {
        let widthSub = this.node.width / 2;
        let newPos = cc.v2(cc.misc.clampf(-widthSub, this._lastPosition.x, widthSub),
                            cc.misc.clampf(-widthSub, this._lastPosition.y, widthSub));
        let len = newPos.mag();
        if(len > widthSub) {
            newPos.x = widthSub * newPos.x / len;
            newPos.y = widthSub * newPos.y / len;
        }
        return newPos;
    }
    // update (dt) {}
}
