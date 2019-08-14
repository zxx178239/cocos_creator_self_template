/*
 * @Author: xxZhang
 * @Date: 2019-08-13 19:31:51
 * @Description: 场景脚本文件，ipc和项目交互的脚本
 */
module.exports = {
    "create_new_node": function(event, param1, param2) {
        var canvas = cc.find("Canvas");
        Editor.log("xxxx: ", param2);
        var newNode = new cc.Node(`${param2}`);
        canvas.addChild(newNode);
        _Scene.createPrefab(newNode.uuid, `db://assets/resources/prefabs/${param1}/`);
        canvas.removeAllChildren(newNode);
    }
}