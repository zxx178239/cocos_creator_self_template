
const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    onLoad () {
        let tmpPhysicsManager = cc.director.getPhysicsManager();
        tmpPhysicsManager.enabled = true;
        tmpPhysicsManager.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits.e_pairBit |
            cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit
            ;
    }

    start () {

    }

    // update (dt) {}
}
