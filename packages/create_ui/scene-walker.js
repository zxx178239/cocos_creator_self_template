/*
 * @Author: xxZhang
 * @Date: 2019-08-13 19:31:51
 * @Description: 场景脚本文件，ipc和项目交互的脚本
 */
module.exports = {
    "create_new_node": function(event) {
        var canvas = cc.find("Canvas");
        var newNode = new cc.Node("Test");
        canvas.addChild(newNode);
        _Scene.createPrefab(newNode.uuid, "db://assets/resources/prefabs/111/");
        canvas.removeAllChildren(newNode);
    }
}