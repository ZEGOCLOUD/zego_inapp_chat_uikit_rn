import ZIM from 'zego-zim-react-native';

export default class ZIMKitGroupCore {
  constructor() {}
  static getInstance() {
    return this.instance || (this.instance = new ZIMKitGroupCore());
  }
  createGroup(name, userIDs, optional) {
    const groupInfo = {
      groupID: optional ? optional.groupID : '',
      groupName: name,
      groupAvatarUrl: '',
    };
    const config = {
      groupNotice: '',
      groupAttributes: {},
    };
    return ZIM.getInstance()
      .createGroup(groupInfo, userIDs, config)
      .then(({ groupInfo, userList, errorUserList }) => {
        console.log('create group success', groupInfo, userList, errorUserList);
        return { groupInfo, userList, errorUserList };
      })
      .catch((err) => {
        console.log('create group err', err);
        return err;
      });
  }
  joinGroup(conversationID) {
    const groupID = conversationID;
    return ZIM.getInstance()
      .joinGroup(groupID)
      .then(({ groupInfo }) => {
        console.log('join group success', groupInfo);
        return { groupInfo };
      })
      .catch((err) => {
        console.log('join group err', err);
        return err;
      });
  }
  leaveGroup(conversationID) {
    const groupID = conversationID;
    return ZIM.getInstance()
      .leaveGroup(groupID)
      .then(({ groupID }) => {
        console.log('leave group success', groupID);
        return { groupID };
      })
      .catch((err) => {
        console.log('leave group err', err);
        return err;
      });
  }
  async queryGroupMemberInfo(userID, conversationID) {
    return await ZIM.getInstance()
      .queryGroupMemberInfo(userID, conversationID)
      .then(({ groupID, userInfo }) => {
        console.log('query group member info success', groupID, userInfo);
        return { groupID, userInfo };
      })
      .catch((err) => {
        console.log('query group member info err', err);
        return err;
      });
  }
}
