import UIBase from "../../components/UIBase";
import { UIMgr } from "../manager/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerTest extends UIBase {
    prefabUrl: string           = "test/LayerTest";
    className: string           = "LayerTest";

    onUILoad () {
        
    }

    start () {

    }

    onPressBtn() {
        UIMgr.popLayer(this.prefabUrl);
    }

}
