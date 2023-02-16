import ZIM from 'zego-zim-react-native';
import ZIMKitConversationCore from './ZIMKitConversationCore';
import ZIMKitMessageCore from './ZIMKitMessageCore';

export default class ZIMKitEventHandler {
  constructor() {}
  static getInstance() {
    return this.instance || (this.instance = new ZIMKitEventHandler());
  }
  initEventHandler() {
    this.onError();
    this.onConnectionStateChanged();
    this.onConversationChanged();
    this.onReceivePeerMessage();
    this.onReceiveGroupMessage();
  }
  unInitEventHandler() {
    this.offError();
    this.offConnectionStateChanged();
    this.offConversationChanged();
    this.offReceivePeerMessage();
    this.offReceiveGroupMessage();
  }
  onError(callback) {
    ZIM.getInstance().on(
      'error',
      callback
        ? callback
        : (zim, errorInfo) => {
            console.log('error', errorInfo, zim);
          }
    );
  }
  offError() {
    ZIM.getInstance().off('error');
  }
  onConnectionStateChanged() {
    ZIM.getInstance().on('connectionStateChanged', (zim, zimResult) => {
      console.log('zim connectionStateChanged', zimResult);
    });
  }
  offConnectionStateChanged() {
    ZIM.getInstance().off('connectionStateChanged');
  }
  onConversationChanged() {
    ZIM.getInstance().on('conversationChanged', (zim, zimResult) => {
      zimResult.infoList.forEach((info) => {
        switch (info.event) {
          case 1:
            // update
            let conversation =
              ZIMKitConversationCore.getInstance().getConversation(
                info.conversation.conversationID,
                info.conversation.type
              );
            if (conversation) {
              Object.assign(conversation, info.conversation);
            }
            break;
          case 0:
            // add
            ZIMKitConversationCore.getInstance().conversationList.push(
              info.conversation
            );
            break;
          case 2:
            // disabled (leave group)
            break;
        }
      });
      ZIMKitConversationCore.getInstance().conversationListChangedCallback(
        ZIMKitConversationCore.getInstance().conversationList
      );
    });
  }
  offConversationChanged() {
    ZIM.getInstance().off('conversationChanged');
  }
  onReceivePeerMessage() {
    ZIM.getInstance().on('receivePeerMessage', (zim, zimResult) => {
      console.log('===messages', ZIMKitMessageCore.getInstance().messages);
      if (ZIMKitMessageCore.getInstance().messages) {
        let messageList = ZIMKitMessageCore.getInstance()
          .messages.get(0)
          ?.get(zimResult.fromConversationID);
        console.log(
          'receivePeerMessage',
          zimResult.messageList,
          zimResult.fromConversationID
        );
        zimResult.messageList.forEach((message) => {
          if (
            messageList &&
            !messageList.some((item) => item.messageID === message.messageID)
          ) {
            messageList.push(message);
          }
        });
        ZIMKitMessageCore.getInstance().messageListChangedCallback(
          zimResult.fromConversationID,
          0,
          messageList
        );
      }
    });
  }
  offReceivePeerMessage() {
    ZIM.getInstance().off('receivePeerMessage');
  }
  onReceiveGroupMessage() {
    ZIM.getInstance().on('receiveGroupMessage', (zim, zimResult) => {
      if (ZIMKitMessageCore.getInstance().messages) {
        let messageList = ZIMKitMessageCore.getInstance()
          .messages.get(2)
          ?.get(zimResult.fromConversationID);
        console.log(
          'receiveGroupMessage',
          zimResult.messageList,
          zimResult.fromConversationID
        );
        zimResult.messageList.forEach((message) => {
          if (
            messageList &&
            !messageList.some((item) => item.messageID === message.messageID)
          ) {
            messageList.push(message);
          }
        });
        ZIMKitMessageCore.getInstance().messageListChangedCallback(
          zimResult.fromConversationID,
          2,
          messageList
        );
      }
    });
  }
  offReceiveGroupMessage() {
    ZIM.getInstance().off('receiveGroupMessage');
  }
}
