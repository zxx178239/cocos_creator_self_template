/*
 * @Author: xxZhang
 * @Date: 2019-08-21 13:23:01
 * @Description: 大厅内容
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    webViewNode: cc.Node = null;

    onLoad () {
        this.webViewNode.scale = this.getGameScale();
        this.listenerResize();
    }

    start () {

    }

    listenerResize() {
        cc.view.setResizeCallback(() => {
            // console.log("listener resize call back");
            this.webViewNode.scale = this.getGameScale();
            // console.log("this.webViewNode.scale: ", this.webViewNode.scale);
            this.scheduleOnce(() => {
                this.webViewNode.getComponent(cc.Widget).updateAlignment();
            }, 0.2);
        })
    }

    getGameScale() {
        let curWidth = cc.winSize.width;
        let curHeight = cc.winSize.height;

        let DesignWidth = 640,
            DesignHeight = 360,
            DesignRatio = DesignWidth / DesignHeight,
            
            ratio = curWidth / curHeight,
            scale;
        if (ratio > DesignRatio) {
            scale = 1;
        } else if (ratio < DesignRatio) {
            scale = curWidth / (curHeight * DesignRatio);
        } else {
            scale = 1;
        }
        return scale;
    }

    // update (dt) {}
}
