/*
 * @Author: xxZhang
 * @Date: 2019-08-22 17:13:16
 * @Description: 水波纹实现， 代码源自于网络
 */
import {ShaderMaterial} from "../ShaderMaterial";
const renderer = cc.renderer.renderEngine.renderer;
// const {ccclass, property} = cc._decorator;

// @ccclass
export class WaterShaderMaterial extends ShaderMaterial {

    // @property(Number)
    private _time: Number;
    public set time(INValue) {
        this.effect.setProperty("iTime", INValue);
    }

    // @property(cc.Vec2)
    private _resolution: cc.Vec2;
    public set resolution(INValue) {
        this.effect.setProperty("iResolution", INValue);
    }

    constructor() {
        super();
        this.name    = "water";
        this.fsh     = `
                            uniform sampler2D texture;
                            uniform vec2 iResolution;
                            uniform float iTime;
                            uniform lowp vec4 color;
                            varying vec2 uv0;
                            #define F cos(x - y) * cos(y), sin(x + y) * sin(y)
                            vec2 s(vec2 p) 
                            {
                                float d = iTime * 0.2, x = 8.*(p.x + d), y = 8.*(p.y + d);
                                return vec2(F);
                            }
                            void mainImage(out vec4 fragColor, in vec2 fragCoord) 
                            {
                                // 换成resolution
                                vec2 rs = iResolution.xy;
                                // 换成纹理坐标v_texCoord.xy
                                vec2 uv = fragCoord;
                                vec2 q = uv + 2./iResolution.x * (s(uv) - s(uv + rs));
                                fragColor = color * texture2D(texture, q);
                            }
                            void main() 
                            {
                                mainImage(gl_FragColor, uv0.xy);
                            }
                            `;
        this.init();
        this.uniform(
            "iResolution",
            renderer.PARAM_FLOAT2,
            cc.v2(10, 10)
        );
        this.uniform(
            "iTime",
            renderer.PARAM_FLOAT,
            0
        );
    }
    

    // update (dt) {}
}
