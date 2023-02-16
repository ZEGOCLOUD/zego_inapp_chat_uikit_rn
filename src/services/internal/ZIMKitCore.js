import ZIM from 'zego-zim-react-native';
import ZIMKitEventHandler from './ZIMKitEventHandler';
import ZIMKitUserCore from './ZIMKitUserCore';
import ZIMKitConversationCore from './ZIMKitConversationCore';
import ZIMKitMessageCore from './ZIMKitMessageCore';
import ZIMKitGroupCore from './ZIMKitGroupCore';

export default class ZIMKitCore {
  constructor() {}
  static getInstance() {
    return this.instance || (this.instance = new ZIMKitCore());
  }
  init(appID, appSign) {
    ZIM.create({ appID, appSign });
    ZIM.getVersion().then((data) => {
      console.log('zim version:', data);
    });
    ZIMKitEventHandler.getInstance().initEventHandler();
  }
  unInit() {
    ZIM.getInstance().destroy();
    ZIMKitEventHandler.getInstance().unInitEventHandler();
  }

  // user
  connectUser(userInfo, token) {
    return ZIMKitUserCore.getInstance().connectUser(userInfo, token);
  }
  disconnectUser() {
    return ZIMKitUserCore.getInstance().disconnectUser();
  }
  queryUser(userID) {
    return ZIMKitUserCore.getInstance().queryUser(userID);
  }
  currentUser() {
    return ZIMKitUserCore.getInstance().userInfo;
  }

  // conversation
  getConversationList() {
    return ZIMKitConversationCore.getInstance().getConversationList();
  }
  onConversationListChanged(callback) {
    return ZIMKitConversationCore.getInstance().onConversationListChanged(
      callback
    );
  }
  getConversation(conversationID, conversationType) {
    return ZIMKitConversationCore.getInstance().getConversation(
      conversationID,
      conversationType
    );
  }
  deleteConversation(conversationID, conversationType) {
    return ZIMKitConversationCore.getInstance().deleteConversation(
      conversationID,
      conversationType
    );
  }
  clearUnreadCount(conversationID, conversationType) {
    return ZIMKitConversationCore.getInstance().clearUnreadCount(
      conversationID,
      conversationType
    );
  }
  loadMoreConversation() {
    return ZIMKitConversationCore.getInstance().loadMoreConversation();
  }

  // message
  getMessageList(conversationID, conversationType) {
    return ZIMKitMessageCore.getInstance().getMessageList(
      conversationID,
      conversationType
    );
  }
  onMessageListChanged(callback) {
    return ZIMKitMessageCore.getInstance().onMessageListChanged(callback);
  }
  offMessageListChanged() {
    return ZIMKitMessageCore.getInstance().offMessageListChanged();
  }
  onPreMessageSending(callback) {
    return ZIMKitMessageCore.getInstance().onPreMessageSending(callback);
  }
  loadMoreMessage(conversationID, conversationType) {
    return ZIMKitMessageCore.getInstance().loadMoreMessage(
      conversationID,
      conversationType
    );
  }
  sendTextMessage(conversationID, conversationType, text, onMessageSent) {
    return ZIMKitMessageCore.getInstance().sendTextMessage(
      conversationID,
      conversationType,
      text,
      onMessageSent
    );
  }

  // group
  createGroup(name, userIDs, optional) {
    return ZIMKitGroupCore.getInstance().createGroup(name, userIDs, optional);
  }
  joinGroup(conversationID) {
    return ZIMKitGroupCore.getInstance().joinGroup(conversationID);
  }
  leaveGroup(conversationID) {
    return ZIMKitGroupCore.getInstance().leaveGroup(conversationID);
  }
  queryGroupMemberInfo(userID, conversationID) {
    return ZIMKitGroupCore.getInstance().queryGroupMemberInfo(
      userID,
      conversationID
    );
  }
}
