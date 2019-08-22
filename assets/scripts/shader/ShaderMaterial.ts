/*
 * @Author: xxZhang
 * @Date: 2019-08-22 10:33:29
 * @Description: shader材质，移植网上代码
 */

const Material = cc.renderer.renderEngine.Material;
const renderer = cc.renderer.renderEngine.renderer;
const gfx = cc.renderer.renderEngine.gfx;

const {ccclass, property} = cc._decorator;

@ccclass
export class ShaderMaterial extends Material {
    protected name: string         = "default";
    
    protected batch: boolean        = true;

    protected vsh: string         = `
                        uniform mat4 viewProj;
                        #ifdef use2DPos
                            attribute vec2 a_position;
                        #endif

                        attribute lowp vec4 a_color;

                        #ifdef useModel
                            uniform mat4 model;
                        #endif

                        #ifdef useTexture
                            attribute mediump vec2 a_uv0;
                            varying mediump vec2 uv0
                        #endif

                        #ifdef useColor
                            varying lowp vec4 v_fragmentColor;
                        #endif

                        void main() {
                            mat4 mvp;
                            #ifdef useModel
                                mvp = viewProj * model;
                            #else
                                mvp = viewProj;
                            #endif

                            #ifdef use2DPos
                                vec4 pos = mvp * vec4(a_position, 0, 1);
                            #else
                                vec4 pos = mvp * vec4(a_position, 1);
                            #endif

                            #ifndef useColor
                                v_fragmentColor = a_color;
                            #endif

                            #ifdef useTexture
                                uv0 = a_uv0;
                            #endif
                            gl_Position = pos;
                        }
                        `

    protected fsh: string         = "";
    
    private _mainTech;
    @property({type: renderer.Technique})
    public get mainTech() {
        return this._mainTech;
    }

    private _effect;
    @property({type: renderer.Effect})
    public get effect() {
        return this._effect;
    }

    private _texture;
    @property({type: cc.Texture2D})
    public get texture() {
        return this._texture;
    }
    public set texture(INVal: cc.Texture2D) {
        if(this._texture !== INVal) {
            this._texture = INVal;
            this._effect.setProperty("texture", INVal.getImpl());
            this._texIds["texture"] = INVal.getId();
        }
    }

    private _color = new cc.Color(255, 255, 255, 255);
    @property({type: cc.Color})
    public get color() {
        return this._color;
    }
    public set color(INVal) {
        if(!INVal.equals(this._color)) {
            this._color = INVal;
            let color = {};
            color.r = INVal.getR() / 255;
            color.g = INVal.getG() / 255;
            color.b = INVal.getB() / 255;
            color.a = INVal.getA() / 255;
            this._effect.setProperty("color", color);
        }
    }

    constructor() {
        super();
        this.init();
    }

    init() {
        if("" === this.fsh || "" === this.vsh) {
            return;
        }
        let lib = cc.renderer._forward._programLib;
        if(!lib._templates[this.name]) {
            lib.define(this.name, this.vsh, this.fsh, []);
        }

        let pass = new renderer.Pass(this.name);
        pass.setDepth(false, false);
        pass.setCullMode(gfx.CULL_NONE);
        pass.setBlend(
            gfx.BLEND_FUNC_ADD,
            gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA,
            gfx.BLEND_FUNC_ADD,
            gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA
        );

        this._mainTech = new renderer.Technique(
            ["transparent"],
            [
                {
                    name: "texture",
                    type: renderer.PARAM_TEXTURE_2D
                },
                {
                    name: "color",
                    type: renderer.PARAM_COLOR4
                }
            ],
            [pass]
        );

        this._effect = new renderer.Effect(
            [
                this._mainTech
            ],
            {
                "color": {
                    r: 1,
                    g: 1,
                    b: 1,
                    a: 1,
                }
            },
            [
                {name: "useColor", value: true},
                {name: "useTexture", value: true},
                {name: "useModel", value: true},
                {name: "alphaTest", value: true},
                {name: "use2DPos", value: true},
                {name: "useTint", value: true},
            ]
        );
    }

    /**
     * @description: 添加shader中的uniform变量，并且赋初始值
     * @param : 
     * @return : 
     */
    uniform(name, type, val) {
        this._mainTech._parameters.push({
            name: name,
            type: type
        });
        this._effect.setProperty(name, val);
    }
}
// ShaderMaterial.batch = true;