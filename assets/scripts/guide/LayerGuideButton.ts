
/*
 * @Author: xxZhang
 * @Date: 2019-10-14 14:39:37
 * @Description: 引导按钮类型，强引导
 */
import UIBase from "../components/UIBase";
import { GuideMgr } from "./GuideManager";
import { UIMgr } from "../manager/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerGuideButton extends UIBase {
    prefabUrl: string           = "guide/LayerGuideButton";
    className: string           = "LayerGuideButton";

    @property(cc.Mask)
    maskComponent: cc.Mask              = null;

    @property(cc.Node)
    grayNode: cc.Node                   = null;

    _touchNode: cc.Node                 = null;     // 触摸点

    onUILoad () {
        this.maskComponent.enabled = false;

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    start () {

    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    initUI(INParams) {
        let guideInfo = INParams[0];
        let layerNode = INParams[1];

        this._touchNode = cc.find(guideInfo["button_name"], layerNode);

        if(!this._touchNode) {
            console.warn("search node error");
            return;
        }

        if(guideInfo["button_shape"] === 1) {
            this.maskComponent.type = cc.Mask.Type.RECT;
            this.maskComponent.node.width = this._touchNode.width;
            this.maskComponent.node.height = this._touchNode.height;
        }else {
            this.maskComponent.type = cc.Mask.Type.ELLIPSE;
            this.maskComponent.node.width = this._touchNode.width;
            this.maskComponent.node.height = this._touchNode.height;
        }

        setTimeout(() => {
            let worldPos = this._touchNode.convertToWorldSpaceAR(cc.v2(0, 0));
            let localPos = this.node.convertToNodeSpaceAR(worldPos);
    
            this.maskComponent.node.x = localPos.x;
            this.maskComponent.node.y = localPos.y;
    
            this.grayNode.x = -localPos.x;
            this.grayNode.y = -localPos.y;
    
            this.maskComponent.enabled = true;
        }, guideInfo["delay_time"] || 100);
    }

    onTouchStart(event) {
        // 如果mask不可见，则拦截
        if(!this.maskComponent.enabled) {
            this.node._touchListener.setSwallowTouches(true);
            return;
        }
        // 如果没有_touchNode，则拦截
        if(!this._touchNode) {
            this.node._touchListener.setSwallowTouches(true);
            return;
        }

        // 如果包含了，则传递下去
        let worldRect = this._touchNode.getBoundingBoxToWorld();
        if(worldRect.contains(event.getLocation())) {
            this.node._touchListener.setSwallowTouches(false);
            UIMgr.popLayer(this.prefabUrl);
            GuideMgr.stepEx();
        }else {
            this.node._touchListener.setSwallowTouches(true);
        }
    }
}
