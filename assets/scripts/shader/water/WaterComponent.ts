/*
 * @Author: xxZhang
 * @Date: 2019-08-22 17:13:28
 * @Description: 水组件，来源于网络
 */
import ShaderComponent from "../ShaderComponent";
import { WaterMaterial } from "./WaterMaterial";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WaterComponent extends ShaderComponent {

    private _time: number       = 0;
    @property({type: Number, visible: false})
    public get time() {
        return this._time;
    }
    public set time(INVal) {
        this._time = INVal;
        this._material.time = INVal;
    }

    @property(cc.Vec2)
    _resolution: cc.Vec2         = null;
    public get resolution() {
        return this._resolution;
    }
    public set resolution(INVal) {
        this._material.resolution = INVal;
    }

    onLoad () {
        this.Material = WaterMaterial;
    }

    start () {

    }

    onEnable() {
        super.onEnable();
        this._resolution = cc.v2(this._material.texture.width, this._material.texture.height);
    }

    update(dt) {
        if(this._time > 65535) {
            this._time = 0;
        }
        this.time += dt;
    }

    // update (dt) {}
}
