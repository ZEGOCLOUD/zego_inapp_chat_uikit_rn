import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';
import TextMessage from './TextMessage';
import Avatar from '../common/Avatar';
import { dateFormat } from '../../utils/dateFormat';
import { useEffect, useState } from 'react';
import ZIMKit from '../../services';
import Delegate from 'react-delegate-component';

function Messages(props) {
  const {
    index,
    item,
    conversationID,
    conversationType,
    messageList,
    itemBuilder,
  } = props;
  const { senderUserID, message, type, timestamp, sentStatus, userInfo } = item;
  const [time, setTime] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setCurrentUser(ZIMKit.getInstance().currentUser());
    setTime(messageDateFormat(timestamp, index));
  }, []);

  const messageDateFormat = (timestamp, index) => {
    if (!timestamp) {
      return;
    }
    if (index === 0) {
      return dateFormat(timestamp, true);
    } else {
      const previousMessage = messageList[index - 1];
      if (previousMessage && timestamp - previousMessage.timestamp > 300000) {
        return dateFormat(timestamp, true);
      }
    }
  };

  return (
    <View style={style.container}>
      {itemBuilder ? (
        <Delegate to={itemBuilder}></Delegate>
      ) : (
        <View>
          {time ? (
            <View style={style.timeBox}>
              <Text style={style.time}>{time}</Text>
            </View>
          ) : null}
          {senderUserID !== currentUser.userID ? (
            <View style={style.leftMsg}>
              <View style={style.avatar}>
                {userInfo?.memberAvatarUrl ? (
                  <Avatar url={userInfo.memberAvatarUrl}></Avatar>
                ) : (
                  <Image
                    style={style.image}
                    source={require('../resources/avatar-default.png')}
                  ></Image>
                )}
              </View>
              <View style={style.content}>
                <Text style={style.name} numberOfLines={1} ellipsizeMode="tail">
                  {userInfo?.userName}
                </Text>
                <View style={style.msgContent}>
                  {type === 1 ? (
                    <TextMessage
                      text={message}
                      backgroundColor="white"
                    ></TextMessage>
                  ) : null}
                </View>
              </View>
            </View>
          ) : (
            <View style={style.rightMsg}>
              {sentStatus === 0 ? (
                <View style={style.loading}>
                  <ActivityIndicator />
                </View>
              ) : null}
              {sentStatus === 2 ? (
                <View style={style.error}>
                  <Image
                    style={style.icon}
                    source={require('../resources/send-fail-icon.png')}
                  ></Image>
                </View>
              ) : null}
              {type === 1 ? (
                <TextMessage
                  text={message}
                  backgroundColor="#3478fc"
                  color="white"
                ></TextMessage>
              ) : null}
              <View style={style.avatar}>
                {currentUser.userAvatarUrl ? (
                  <Avatar url={currentUser.userAvatarUrl}></Avatar>
                ) : (
                  <Image
                    style={style.image}
                    source={require('../resources/avatar-default.png')}
                  ></Image>
                )}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeBox: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  time: {
    fontSize: 12,
    color: '#b1b4bb',
  },
  leftMsg: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 16,
  },
  rightMsg: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 8,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatar: {
    marginLeft: 12,
    marginRight: 12,
  },
  image: {
    width: 44,
    height: 44,
  },
  name: {
    marginBottom: 2,
    maxWidth: '80%',
  },
  msgContent: {
    flex: 1,
    flexDirection: 'row',
  },
  error: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
export default Messages;
