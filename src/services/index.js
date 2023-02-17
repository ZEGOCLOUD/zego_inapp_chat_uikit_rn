import ZIMKitCore from './internal/ZIMKitCore';

export default class ZIMKit {
  static instance;
  constructor() {
    if (!ZIMKit.instance) {
      ZIMKit.instance = this;
    }
    return ZIMKit.instance;
  }
  static getInstance() {
    if (!ZIMKit.instance) {
      ZIMKit.instance = new ZIMKit();
    }
    return ZIMKit.instance;
  }
  getModuleName() {
    return 'ZIMKit';
  }
  init(appID, appSign, plugins) {
    return ZIMKitCore.getInstance().init(appID, appSign, plugins);
  }
  unInit() {
    ZIMKitCore.getInstance().unInit();
  }

  // user
  connectUser(userInfo, token) {
    return ZIMKitCore.getInstance().connectUser(userInfo, token);
  }
  disconnectUser() {
    return ZIMKitCore.getInstance().disconnectUser();
  }
  currentUser() {
    return ZIMKitCore.getInstance().currentUser();
  }
  queryUser(userID) {
    return ZIMKitCore.getInstance().queryUser(userID);
  }

  // conversation
  getConversationList() {
    return ZIMKitCore.getInstance().getConversationList();
  }
  onConversationListChanged(callback) {
    return ZIMKitCore.getInstance().onConversationListChanged(callback);
  }
  deleteConversation(conversationID, conversationType) {
    return ZIMKitCore.getInstance().deleteConversation(
      conversationID,
      conversationType
    );
  }
  clearUnreadCount(conversationID, conversationType) {
    return ZIMKitCore.getInstance().clearUnreadCount(
      conversationID,
      conversationType
    );
  }
  loadMoreConversation() {
    return ZIMKitCore.getInstance().loadMoreConversation();
  }

  // message
  getMessageList(conversationID, conversationType) {
    return ZIMKitCore.getInstance().getMessageList(
      conversationID,
      conversationType
    );
  }
  onMessageListChanged(callback) {
    return ZIMKitCore.getInstance().onMessageListChanged(callback);
  }
  offMessageListChanged() {
    return ZIMKitCore.getInstance().offMessageListChanged();
  }
  onPreMessageSending(callback) {
    return ZIMKitCore.getInstance().onPreMessageSending(callback);
  }
  loadMoreMessage(conversationID, conversationType) {
    return ZIMKitCore.getInstance().loadMoreMessage(
      conversationID,
      conversationType
    );
  }
  sendTextMessage(conversationID, conversationType, text, onMessageSent) {
    return ZIMKitCore.getInstance().sendTextMessage(
      conversationID,
      conversationType,
      text,
      onMessageSent
    );
  }

  // group
  createGroup(name, userIDs, optional) {
    return ZIMKitCore.getInstance().createGroup(name, userIDs, optional);
  }
  joinGroup(conversationID) {
    return ZIMKitCore.getInstance().joinGroup(conversationID);
  }
  leaveGroup(conversationID) {
    return ZIMKitCore.getInstance().leaveGroup(conversationID);
  }
  queryGroupMemberInfo(userID, conversationID) {
    return ZIMKitCore.getInstance().queryGroupMemberInfo(
      userID,
      conversationID
    );
  }
}
