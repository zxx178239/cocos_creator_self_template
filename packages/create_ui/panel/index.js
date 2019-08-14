/*
 * @Author: xxZhang
 * @Date: 2019-08-05 20:54:21
 * @Description: panel主脚本
 */

var fs = require("fs");

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
      var prefixPath = `${Editor.Project.path}/assets`
      this.$btn.addEventListener('confirm', () => {
        var curValue = this.$editText.value;
        var pathArr = curValue.split("/");
        if(pathArr.length < 2) {
          return;
        }

        let createFile = function(INFileName) {
            fs.access(`${prefixPath}/scripts/${INFileName}`, (err) => {
              if(err) {
                Editor.assetdb.create(`db://assets/scripts/${INFileName}`, "", () => {
        
                })
              }else {
                Editor.log("文件已经存在");
              }
            })
        }

        let createPrefab = function(INFileName) {
          fs.access(`${prefixPath}/resources/prefabs/${INFileName}`, (err) => {
            if(err) {
              Editor.Scene.callSceneScript("create_ui", "create_new_node", pathArr[0], pathArr[1], (err) => {
            
              });
            }else {
              Editor.log("文件已经存在");
            }
          })
        }

        fs.access(`${prefixPath}/resources/prefabs/${pathArr[0]}`, (err) => {
          if(err && err.code == "ENOENT") {
            Editor.log("文件不存在");
            Editor.assetdb.create(`db://assets/resources/prefabs/${pathArr[0]}`, "", () => {
              createPrefab(`${pathArr[0]}/${pathArr[1]}.prefab`);
            });
          }else {
            createPrefab(`${pathArr[0]}/${pathArr[1]}.prefab`);
          }
        })
        
        fs.access(`${prefixPath}/resources/prefabs/${pathArr[0]}`, (err) => {
          if(err && err.code == "ENOENT") {
            Editor.log("文件不存在");
            Editor.assetdb.create(`db://assets/scripts/${pathArr[0]}`, "", () => {
              createFile(`${pathArr[0]}/${pathArr[1]}.js`);
            })
          }else {
            createFile(`${pathArr[0]}/${pathArr[1]}.js`);
          }
        })  
        
      });
    },
});