/*
 * @Author: xxZhang
 * @Date: 2019-08-13 19:31:51
 * @Description: 场景脚本文件，ipc和项目交互的脚本
 */
const dontSelectCorrectAssetMsg = {
    type: 'warning',
    buttons: ['OK'],
    title: 'warning',
    message: 'Please select a UI prefab!',
    defaultId: 0,
    noLink: true
};


module.exports = {
    "create_new_node": function (event, param1, param2, param3) {
        var canvas = cc.find("Canvas");
        // Editor.log("xxxx: ", param2);

        var newNode = new cc.Node(`${param2}`);
        canvas.addChild(newNode);
        // newNode.addComponent(`${param2}`);
        _Scene.createPrefab(newNode.uuid, `db://assets/${param3}/prefabs/${param1}/`);
        canvas.removeAllChildren(newNode);
        Editor.log("create ok");

    }
}