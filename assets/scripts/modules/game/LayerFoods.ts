
/*
 * @Author: xxZhang
 * @Date: 2019-08-21 17:32:11
 * @Description: 食物层
 */
import { ResMgr } from "../../manager/ResManager";
import HHelpTools from "../../tools/HHelpTools";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerFoods extends cc.Component {

    @property(cc.Prefab)
    foodPrefab: cc.Prefab = null;                       // 食物的prefab

    _foodPool: cc.NodePool = new cc.NodePool();         // 食物对象池

    onLoad () {
        this.initFoods();
        // this.schedule(this.createFoods, 5);
        this.createFoods();
    }

    start () {

    }

    onDestroy() {
        this.unschedule(this.createFoods);
    }

    initFoods() {
        for(let i = 0; i < 50; ++ i) {
            let newFood = this.createOneFood();
            this._foodPool.put(newFood);
        }
    }

    createFoods() {
        let putFoodNode = null;
        if(this._foodPool.size() > 0) {
            putFoodNode = this._foodPool.get();
        }else {
            putFoodNode = this.createOneFood();
        }
        putFoodNode.parent = this.node;
    }

    private createOneFood() {
        let randIndex = Math.floor(Math.random() * 3) + 1;
        let newFood = cc.instantiate(this.foodPrefab);
        ResMgr.replaceSprite(newFood, `foods/icon_food_${randIndex}`);
        // newFood.position = HHelpTools.getRandomPos();
        newFood.position = cc.v2(0, 0);
        return newFood;
    }

    // update (dt) {}
}
