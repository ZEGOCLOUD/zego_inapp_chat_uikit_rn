import { ZegoPluginName } from './defines';
import * as ZIM from 'zego-zim-react-native';

export default class ZIMKitPlugins {
    _instance;
    plugins = new Map();
    constructor() { }
    static getInstance() {
        return this._instance || (this._instance = new ZIMKitPlugins());
    }
    installPlugins(plugins = []) {
        plugins.forEach(plugin => {
            console.log('[ZIMKitPlugins]installPlugins plugin', plugin.default.getModuleName);
            if (plugin.default && typeof plugin.default.getModuleName === 'function') {
                const pluginName = plugin.default.getModuleName();
                switch (pluginName) {
                    case ZegoPluginName.PrebuiltCall:
                    case ZegoPluginName.PrebuiltLiveAudioRoom:
                    case ZegoPluginName.PrebuiltLiveStreaming:
                    case ZegoPluginName.PrebuiltVideoConference:
                        this.plugins.set(pluginName, plugin);
                        console.log('[ZIMKitPlugin]installPlugins pluginName', pluginName);
                        break;
                    default:
                        break;
                }
            }
        });
    }
    // getZegoPrebuiltCallPlugin() {
    //     return this.plugins.get(ZegoPluginName.PrebuiltCall);
    // }
    // initPlugins(appInfo, userInfo, token) {
    //     if (this.getZegoPrebuiltCallPlugin()) {
    //         const ZegoUIKitPrebuiltCallService = this.getZegoPrebuiltCallPlugin().default;
    //         console.log('ZegoUIKitPrebuiltCallService', ZegoUIKitPrebuiltCallService.init);
    //         ZegoUIKitPrebuiltCallService.init(
    //             appInfo.appID,
    //             appInfo.appSign,
    //             userInfo.userID,
    //             userInfo.userName,
    //             [ZIM],
    //             {token}
    //         ).then(() => {
    //             console.log('initPlugins success!');
    //         });
    //     }
    // }
}