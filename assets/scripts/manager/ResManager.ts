
/*
 * @Author: xxZhang
 * @Date: 2019-08-21 19:07:08
 * @Description: 资源管理器
 */
import { LogMgr, LOG_TAGS } from "./LogManager";

class ResManager {
    public static readonly Instance = new ResManager();

    /**
     * @description: 替换当前节点的图片
     * @param : 
     * @return : 
     */
    public replaceSprite(INNode: cc.Node, INSpritePath: string, INCallback?: Function) {
        INSpritePath = "ui/" + INSpritePath;
        cc.loader.loadRes(INSpritePath, cc.SpriteFrame, (err, res) => {
            if(err) {
                LogMgr.warn(LOG_TAGS.LOG_BALL_GAME_UI, "replace sprite error", INSpritePath);
                return;
            }
            INNode.getComponent(cc.Sprite).spriteFrame = res;
            INCallback && INCallback();
        })
    }

}

export const ResMgr = ResManager.Instance;

