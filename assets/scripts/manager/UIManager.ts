
class UIManager {
    public static readonly Instance = new UIManager();

    private _layerList: any          = [];               // 管理ui层级


    public pushLayer(INPrefabFilePath: string, INCallback?: Function) {
        hhelptools.requirePrefab(INPrefabFilePath, (prefabNode) => {
            app.node.addChild(prefabNode);
            this._layerList.push(prefabNode);
            if(INCallback) {
                INCallback(prefabNode);
            }
            
        });
    }

    public popLayer() {

    }

    public removeAllLayers() {
        this._layerList = [];
    }
}

export const UIMgr = UIManager.Instance;

