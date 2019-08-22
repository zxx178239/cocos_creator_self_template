/*
 * @Author: xxZhang
 * @Date: 2019-08-22 16:39:07
 * @Description: shader组件，移植网上代码
 */
import {ShaderMaterial} from "./ShaderMaterial";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShaderComponent extends cc.Component {

    @property({type: Object, visible: false})
    Material: Object  = null;

    private _material;
    @property({type: ShaderMaterial, serializable: false, visible: false})
    material: ShaderMaterial = null;


    onEnable() {
        console.log("shader component onenable");
        cc.dynamicAtlasManager.enabled = false;

        let rc = this.getComponent(cc.RenderComponent);
        let originMaterial = rc.getMaterial();
        let texture = null;
        if(rc instanceof cc.Sprite) {
            texture = rc.spriteFrame.getTexture();
        }else if(rc instanceof dragonBones.ArmatureDisplay) {
            texture = rc.dragonAtlasAsset && rc.dragonAtlasAsset.texture;
        }

        // 替换材质
        // 
        let material = this._material || new this.Material(this.Material.batch);
        material.useColor = !!originMaterial.useColor;
        material.useTexture = !!originMaterial.useTexture;
        material.useModel = !!originMaterial.useModel;
        material.alphaTest = !!originMaterial.alphaTest;
        material.use2DPos = !!originMaterial.use2DPos;
        material.useTint = !!originMaterial.useTint;

        if(texture) {
            material.texture = texture;
            if(rc instanceof cc.Sprite && rc._renderData) {
                rc._renderData.material = material;
            }
            rc.markForUpdateRenderData(true);
            rc.markForRender(true);
        }else {
            rc.disableRender();
        }
        rc._updateMaterial(material);

        let color = new cc.Color(
            this.node.color.getR(),
            this.node.color.getG(),
            this.node.color.getB(),
            this.node.color.getA()
        );
        material.color = color;

        this._material = material;
    }

    onDisable() {
        let rc = this.getComponent(cc.RenderComponent);
        rc._material = null;
        rc._activateMaterial();
    }
}
