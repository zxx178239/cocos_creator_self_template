/*
 * @Author: xxZhang
 * @Date: 2019-05-07 07:26:50
 * @Description: 网络管理器，唯一对外接口
 */
import { NetNode, NetworkOptions } from "../network/NetNode";


class NetManager {
    public static readonly Instance         = new NetManager();
    private _socketList: NetNode[]          = [];

    /**
     * @description: 创建一个socket
     * @param : 
     * @return : 
     */
    public createSocket(INNetNode: NetNode, INSocketId: number = 0) {
        this._socketList[INSocketId] = INNetNode;
        this._socketList[INSocketId].createSocket();
    }

    /**
     * @description: 移除socket
     * @param : 
     * @return : 
     */
    public removeSocket(INSocketId: number) {
        if(this._socketList[INSocketId]) {
            delete this._socketList[INSocketId];
        }
    }

    /**
     * @description: 进行网络连接操作
     * @param : 
     * @return : 
     */
    public connect(INNetOptions: NetworkOptions, INSocketId: number = 0): boolean {
        if(this._socketList[INSocketId]) {
            return this._socketList[INSocketId].connect(INNetOptions);
        }
        return false;
    }
    
    public sendProto
}

export const NetMgr = NetManager.Instance;