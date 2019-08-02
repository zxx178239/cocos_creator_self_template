import { UIMgr } from "../manager/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad () {}

    start () {
        this.schedule(() => {
            UIMgr.pushLayer("test/LayerTest");
        }, 3);
    }

    // update (dt) {}
}
