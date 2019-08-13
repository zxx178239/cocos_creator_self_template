/*
 * @Author: xxZhang
 * @Date: 2019-08-05 20:54:21
 * @Description: panel主脚本
 */
Editor.Panel.extend({
    style: `
      :host { margin: 5px; }
      h2 { color: #f90; }
    `,
  
    template: `
      <h2>创建prefab</h2>

      <div>prefab路径:      <input type="text" id="prefabPath" /></div>
      <p />
      <form action="" method="get">
        是否有脚本?
        <label><input id="ScriptHas" type="radio" checked="checked" />是</label>
        <label><input id="ScriptHas" type="radio" />否</label>
      </form>
      <hr />
      <ui-button id="btn">创建</ui-button>
    `,
  
    $: {
      btn: '#btn',
      editText: '#prefabPath',
      radioCheck: "#ScriptHas"
    },
  
    ready () {
      this.$btn.addEventListener('confirm', () => {
        var curValue = this.$editText.value;
        var pathArr = curValue.split("/");
        if(pathArr.length < 2) {
          return;
        }

        // Editor.log(`value: ${this.$editText.value}`);
        Editor.assetdb.create(`db://assets/resources/prefabs/${pathArr[0]}`, "", () => {
          Editor.Scene.callSceneScript("create_ui", "create_new_node", (err) => {
          
          });
        });
        Editor.assetdb.create(`db://assets/scripts/${pathArr[0]}`, "", () => {
          Editor.assetdb.create(`db://assets/scripts/${pathArr[0]}/${pathArr[1]}.js`, "", () => {

          })
        })
      });
    },

    
});