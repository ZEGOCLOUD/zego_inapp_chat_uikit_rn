import ZIM from 'zego-zim-react-native';

export default class ZIMKitUserCore {
  constructor() {
    this.userInfo = {};
  }
  static getInstance() {
    return this.instance || (this.instance = new ZIMKitUserCore());
  }
  connectUser(userInfo, token) {
    return ZIM.getInstance()
      .login(userInfo, token)
      .then((zimResult) => {
        this.queryUser(userInfo.userID).then((data) => {
          const currentUser = {
            ...userInfo,
            userAvatarUrl: data.userList[0].userAvatarUrl,
          };
          this.userInfo = currentUser;
        });
        console.log('zim login success');
        return zimResult;
      })
      .catch((err) => {
        console.log('zim login err', err);
        return err;
      });
  }
  disconnectUser() {
    return ZIM.getInstance().logout();
  }
  queryUser(userID) {
    const userIDs = [userID];
    return ZIM.getInstance()
      .queryUsersInfo(userIDs, { isQueryFromServer: false })
      .then(({ userList, errorUserList }) => {
        console.log('query users info success', userList, errorUserList);
        return { userList, errorUserList };
      })
      .catch((err) => {
        console.log('query users info err', err);
        return err;
      });
  }
}
