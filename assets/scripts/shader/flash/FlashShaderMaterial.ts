/*
 * @Author: xxZhang
 * @Date: 2019-08-22 17:13:16
 * @Description: flash动画实现， 代码源自于网络
 */
import {ShaderMaterial} from "../ShaderMaterial";
const renderer = cc.renderer.renderEngine.renderer;


export class FlashShaderMaterial extends ShaderMaterial {
    
    private _time;
    public time set(INVal) {
        this.effect.setProperty("time", INVal);
    }

    constructor() {
        super();
        this.name = "flash";
        this.fsh = `
                    precision lowp float;
                    uniform sampler2D texture;
                    varying mediump vec2 uv0;
                    uniform lowp vec4 color;
                    uniform float time;
                    uniform float Angle;
                    uniform float Interval;
                    uniform float Speed;
                    uniform float Wight;
                    float flash(vec2 uv)
                    {
                        float radian = 0.0174444 * Angle;
                        float x0 = fract(time / Interval) * Interval * Speed;
                        float projection_x = uv.y / tan(radian);
                        float xn = x0 - projection_x;
                        float mid_luminous = xn;
                        float rate = 1.0 - abs(uv.x - mid_luminous) / Wight;
                        float brightness = max(rate, 0.0);
                        return brightness;
                    }

                    void main()
                    {
                        vec4 tex = color * texture2D(texture, uv0);
                        if(tex.w > 0.5)
                        {
                            float brightness = flash(uv0);
                            gl_FragColor = tex + vec4(1.0, 1.0, 1.0, 1.0) * brightness;
                        }else
                        {
                            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
                        }
                    }
                    `;
        this.init();
        this.uniform(
            "time",
            renderer.PARAM_FLOAT,
            0.0
        );

        this.uniform(
            "Angle",
            renderer.PARAM_FLOAT,
            45.0
        );

        this.uniform(
            "Interval",
            renderer.PARAM_FLOAT,
            2.0
        );

        this.uniform(
            "Speed",
            renderer.PARAM_FLOAT,
            2.0
        );

        this.uniform(
            "Wight",
            renderer.PARAM_FLOAT,
            0.2
        )
    }
}
