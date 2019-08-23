/*
 * @Author: xxZhang
 * @Date: 2019-08-22 17:13:28
 * @Description: 水组件，来源于网络
 */
import ShaderComponent from "../ShaderComponent";
import { FluxayShaderMaterial } from "./FluxayShaderMaterial";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FluxayShaderComponent extends ShaderComponent {

    private _time: number       = 0;
    public get time() {
        return this._time;
    }
    public set time(INVal) {
        this._time = INVal;
        this._material.time = INVal;
    }

    onLoad() {
        this.Material = FluxayShaderMaterial;
    }

    update(dt) {
        if(this._time > 65535) {
            this._time = 0;
        }
        this._time += dt;
    }

    // update (dt) {}
}
