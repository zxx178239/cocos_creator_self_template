import HHelpTools from "../tools/HHelpTools";
import UIBase from "../components/UIBase";
import { PATH_HEADS } from "../common/GameDefine";
import { LayerZOrder } from "../common/LayerZOrderDefine";
import { LogMgr, LOG_TAGS } from "./LogManager";

class UIManager {
    public static readonly Instance = new UIManager();

    private _layerList: Map<string, UIBase>          = new Map<string, UIBase>();               // 管理ui层级

    private _commonLayerList: any    = [];              // 管理通用弹窗的，可以和普通弹窗并存

    /**
     * @description: 弹窗层
     * @param : INPrefabFilePath: prefab文件路径名; INZorder: 层级； INCallback: 回调函数; INParams: 参数
     * @return : 
     */
    public pushLayer(INPrefabFilePath: string, INZorder: LayerZOrder = LayerZOrder.UI, INCallback?: Function, 
                    ...INParams: any[]) {
        if(this.searchLayer(INPrefabFilePath)) {
            LogMgr.warn(LOG_TAGS.LOG_POP_UI, "the layer has been created: ", INPrefabFilePath);
            return;
        }
        
        HHelpTools.requirePrefab(INPrefabFilePath, (prefabNode) => {
            let curScene = cc.director.getScene().getChildByName("Canvas");
            curScene.addChild(prefabNode);

            prefabNode.zIndex = INZorder;
            let splitArr = INPrefabFilePath.split("/");
            let scriptName = splitArr[splitArr.length - 1];
            let prefabScript = prefabNode.getComponent(scriptName);

            prefabScript.initUI(INParams);
            INCallback && INCallback(prefabNode);

            this._layerList.set(INPrefabFilePath, prefabNode);
        });
    }

    /**
     * @description: 删除窗体
     * @param : 
     * @return : 
     */
    public popLayer(INPrefabFilePath: string) {
        if(cc.isValid(this._layerList.get(INPrefabFilePath))) {
            this._layerList.get(INPrefabFilePath).destroy();
            this.clearNoCommonDepend(INPrefabFilePath);
            this._layerList.delete(INPrefabFilePath);
        }
    }

    /**
     * @description: 移除所有的窗体
     * @param : 
     * @return : 
     */
    public removeAllLayers() {
        this._layerList.forEach((uiNode, key) => {
            this.popLayer(key);
        });
        this._layerList.clear();
    }

    /**
     * @description: 删除资源中所有的非公有资源的项
     * @param : 
     * @return : 
     */
    private clearNoCommonDepend(INPrefabFilePath: string) {
        let prefabPath = PATH_HEADS.PREFAB + INPrefabFilePath;
        let allDeps = cc.loader.getDependsRecursively(prefabPath);

        allDeps.forEach((item) => {

        });
    }

    /**
     * @description: 依据prefab路径名获取对应的prefab
     * @param : INPrefabFilePath： prefab文件路径
     * @return : 
     */
    private searchLayer(INPrefabFilePath: string) {
        return this._layerList.has(INPrefabFilePath);
    }

}

export const UIMgr = UIManager.Instance;

