
export default class HHelpTools {

    public requirePrefab(INPrefabFilePath: string, INCallback: Function) {
        let completePath = "prefabs/" + INPrefabFilePath;

        let prefabRes = cc.loader.getRes(completePath);

        if(prefabRes) {
            INCallback(cc.instantiate(prefabRes));
            return;
        }

        cc.loader.loadRes(completePath, cc.Prefab, function(err, res) {
            if(err) {
                app.logMgr.error("load prefab error", err, completePath);
                return;
            }

            INCallback(cc.instantiate(res));
        })
    }
}