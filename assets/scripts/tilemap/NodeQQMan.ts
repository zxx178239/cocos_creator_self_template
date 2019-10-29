/*
 * @Author: xxZhang
 * @Date: 2019-10-28 19:57:01
 * @Description: 炸弹人
 */

// 移动方向
const MOVE_DIRECTION = {
    LEFT: 1,
    RIGHT: 2,
    UP: 4,
    DOWN: 8
}

// 人物状态
const MAN_STATUS = {
    STOP: 1,
    RUN: 2,
    DIE: 3,
    COLLIDER: 4
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class NodeQQMan extends cc.Component {

    _moveDirection: any = 0;
    _moveStep: number = 1;
    _isCollider: boolean = false;
    private lastPosition: cc.Vec2 = cc.v2(0, 0);

    private _tiledLayer: cc.TiledLayer   = null;
    private _tileSize: cc.Size      = null;
    private _tileMapSize: cc.Size   = null;

    private _status: any        = MAN_STATUS.STOP;      // 人物状态
    set status(INValue) {
        if(this.status === INValue) return;
        this._status = INValue;
        this.playAnimation();
    }

    get status() {
        return this._status;
    }

    onLoad () {
        this.registerKeyListener();
    }

    start () {

    }

    onDestroy() {
        this.removeKeyListener();
    }
 
    onCollisionEnter() {
        console.log("hahhaaaaa");
        this._isCollider = true;
        // this._status = MAN_STATUS.COLLIDER;
    }

    onCollisionExit() {
        console.log("exit");
        this._isCollider = false;
    }

    registerKeyListener() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyUp, this);
    }

    removeKeyListener() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.keyUp, this);
    }

    /**
     * @description: 初始化一些参数
     * @param : 
     * @return : 
     */
    initParams(INTileMap, INTileLayer) {
        this._tiledLayer = INTileLayer;

        this._tileSize = INTileMap.getTileSize();
        this._tileMapSize = INTileMap.getMapSize();
    }

    keyDown(event) {
        if(this._status === MAN_STATUS.COLLIDER) {
            return;
        }
        switch (event.keyCode) {
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                if (!(this._moveDirection & MOVE_DIRECTION.LEFT)) {
                    this.node.getComponent(cc.Animation).play("man_left");
                    this._moveDirection |= MOVE_DIRECTION.LEFT;
                }
                this._status = MAN_STATUS.RUN;
                break;

            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                if (!(this._moveDirection & MOVE_DIRECTION.RIGHT)) {
                    this.node.getComponent(cc.Animation).play("man_right");
                    this._moveDirection |= MOVE_DIRECTION.RIGHT;
                }
                this._status = MAN_STATUS.RUN;
                break;

            case cc.macro.KEY.up:
            case cc.macro.KEY.w:
                if (!(this._moveDirection & MOVE_DIRECTION.UP)) {
                    this.node.getComponent(cc.Animation).play("man_up");
                    this._moveDirection |= MOVE_DIRECTION.UP;
                }
                this._status = MAN_STATUS.RUN;
                break;

            case cc.macro.KEY.down:
            case cc.macro.KEY.s:
                if (!(this._moveDirection & MOVE_DIRECTION.DOWN)) {
                    this.node.getComponent(cc.Animation).play("man_down");
                    this._moveDirection |= MOVE_DIRECTION.DOWN;
                }
                this._status = MAN_STATUS.RUN;
                break;
        }
    }

    keyUp(event) {
        if(this._status === MAN_STATUS.COLLIDER) {
            return;
        }
        switch (event.keyCode) {
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                this.node.getComponent(cc.Animation).stop("man_left");
                this._moveDirection &= (~MOVE_DIRECTION.LEFT);
                this._status = MAN_STATUS.STOP;
                break;

            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.node.getComponent(cc.Animation).stop("man_right");
                this._moveDirection &= (~MOVE_DIRECTION.RIGHT);
                this._status = MAN_STATUS.STOP;
                break;

            case cc.macro.KEY.up:
            case cc.macro.KEY.w:
                this.node.getComponent(cc.Animation).stop("man_up");
                this._moveDirection &= (~MOVE_DIRECTION.UP);
                this._status = MAN_STATUS.STOP;
                break;

            case cc.macro.KEY.down:
            case cc.macro.KEY.s:
                this.node.getComponent(cc.Animation).stop("man_down");
                this._moveDirection &= (~MOVE_DIRECTION.DOWN);
                this._status = MAN_STATUS.STOP;
                break;
        }
    }

    lateUpdate() {
        if(this._status === MAN_STATUS.RUN && this._isCollider) {
            var p1 = this.lastPosition;
            
            if (this._moveDirection & MOVE_DIRECTION.LEFT) {
                p1.x += this._moveStep;
            } else if (this._moveDirection & MOVE_DIRECTION.RIGHT) {
                p1.x -= this._moveStep;
            } else if (this._moveDirection & MOVE_DIRECTION.UP) {
                p1.y -= this._moveStep;
            } else if (this._moveDirection & MOVE_DIRECTION.DOWN) {
                p1.y += this._moveStep;
            }
            this.node.position = p1;
        }
        this.lastPosition = this.node.position;  
    }

    update() {
        if(this._status === MAN_STATUS.COLLIDER) {
            return;
        }else if(this._status === MAN_STATUS.RUN) {
            console.log("move");
            this.moveMan();
        }
    }

    moveMan() {
        let newX = this.node.x;
        let newY = this.node.y;
        // let curTilePos = this.calTilePos(this.node.x, this.node.y);
        // let tileGid = 0;
       
        if (this._moveDirection & MOVE_DIRECTION.LEFT) {
            newX = newX - this._moveStep;
            // tileGid = this.isHasHinder(curTilePos.x - 1, curTilePos.y);
        } else if (this._moveDirection & MOVE_DIRECTION.RIGHT) {
            newX = newX + this._moveStep;
            // tileGid = this.isHasHinder(curTilePos.x + 1, curTilePos.y);
        } else if (this._moveDirection & MOVE_DIRECTION.UP) {
            newY = newY + this._moveStep;
            // tileGid = this.isHasHinder(curTilePos.x, curTilePos.y - 1);
        } else if (this._moveDirection & MOVE_DIRECTION.DOWN) {
            newY = newY - this._moveStep;
            // tileGid = this.isHasHinder(curTilePos.x, curTilePos.y + 1);
        }
        
        // if(tileGid) {
        //     return;
        // }

        newX = cc.misc.clampf(newX, 20, this.node.parent.width - 20);
        newY = cc.misc.clampf(newY, 44, this.node.parent.height - 44);
        this.node.position = cc.v2(newX, newY);
    }

    playAnimation() {
        let status = this._status;
        
    }

    calTilePos(INPosX, INPosY) {
        let diffX = Math.floor(INPosX / this._tileSize.width);
        let diffY = Math.floor(INPosY / this._tileSize.height);
        diffY = this._tileMapSize.height - diffY;
        diffX = diffX - 1;
        return cc.v2(diffX, diffY);
    }

    isHasHinder(INX, INY) {
        if(INX < 0 || INY < 0 || INX >= this._tileMapSize.width || INY >= this._tileMapSize.height) {
            return 0;
        }

        return this._tiledLayer.getTileGIDAt(INX, INY);
    }
    // update (dt) {}
}
