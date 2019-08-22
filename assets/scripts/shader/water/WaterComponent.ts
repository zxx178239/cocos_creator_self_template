/*
 * @Author: xxZhang
 * @Date: 2019-08-22 17:13:28
 * @Description: 水组件，来源于网络
 */
import ShaderComponent from "../ShaderComponent";

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
        this.material.time = INVal;
    }

    @property(cc.Vec2)
    _resolution: cc.Vec2         = null;
    public get resolution() {
        return this.resolution;
    }
    public set resolution(INVal) {
        this.material.resolution = INVal;
    }

    onLoad () {
        this.Material = require("./WaterMaterial");
    }

    start () {

    }

    onEnable() {
        super.onEnable();
        this.resolution = cc.v2(this.material.texture.width, this.material.texture.height);
    }

    update(dt) {
        if(this._time > 65535) {
            this._time = 0;
        }
        this.time += dt;
    }

    // update (dt) {}
}
