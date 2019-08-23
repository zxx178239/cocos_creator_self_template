/*
 * @Author: xxZhang
 * @Date: 2019-08-22 17:13:28
 * @Description: flash组件，来源于网络
 */
import ShaderComponent from "../ShaderComponent";
import { FlashShaderMaterial } from "./FlashShaderMaterial";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FlashShaderComponent extends ShaderComponent {

    private _time: number       = 0;
    public get time() {
        return this._time;
    }
    public set time(INVal) {
        this._time = INVal;
        this._material.time = INVal;
    }

    onLoad () {
        this.Material = FlashShaderMaterial;
    }

    start () {

    }

    update(dt) {
        if(this._time > 65535) {
            this._time = 0;
        }
        this.time += dt;
    }

    // update (dt) {}
}
