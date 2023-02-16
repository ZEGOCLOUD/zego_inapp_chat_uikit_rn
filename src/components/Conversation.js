import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Delegate from 'react-delegate-component';
import Avatar from './common/Avatar';
import { dateFormat } from '../utils/dateFormat';
import { useState } from 'react';
import ZIMKit from '../services/index';

function Conversation(props) {
  const {
    conversationID,
    conversationName,
    conversationType,
    conversationAvatarUrl,
    lastMessage,
    lastMessageBuilder,
    lastMessageTimeBuilder,
    onPressed,
    onLongPress,
    unreadMessageCount,
  } = props;
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuLocationX, setMenuLocationX] = useState(0);
  const [menuLocationY, setMenuLocationY] = useState(0);

  const defaultOnLongPress = (event) => {
    setMenuVisible(true);
    console.log('defaultOnLongPress', conversationID, conversationName);
  };

  const onMenuMaskPress = () => {
    console.log('onMenuMaskPress');
    setMenuVisible(!menuVisible);
  };

  const onDeletePress = () => {
    console.log('onDeletePress');
    setMenuVisible(!menuVisible);
    Alert.alert('Confirm', 'Do you want to delete this conversation?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          console.log('OK Pressed');
          ZIMKit.getInstance().deleteConversation(
            conversationID,
            conversationType
          );
        },
      },
    ]);
  };

  const onQuitPress = () => {
    console.log('onQuitPress');
    setMenuVisible(!menuVisible);
    Alert.alert('Confirm', 'Do you want to leave this group?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          console.log('OK Pressed');
          ZIMKit.getInstance().leaveGroup(conversationID);
        },
      },
    ]);
  };

  const onCancelPress = () => {
    console.log('onCancelPress');
    setMenuVisible(!menuVisible);
  };

  const onConversationPressed = () => {
    ZIMKit.getInstance().clearUnreadCount(conversationID, conversationType);
    const props = {
      conversationID,
      conversationName,
      conversationType,
      conversationAvatarUrl,
    };
    onPressed(props);
  };

  return (
    <TouchableWithoutFeedback
      onPress={onConversationPressed}
      onLongPress={onLongPress ? onLongPress : defaultOnLongPress}
    >
      <View style={style.conversationItem}>
        <View style={style.avatar}>
          {unreadMessageCount ? (
            <View style={style.unreadBox}>
              <Text style={style.unreadMessage}>
                {unreadMessageCount > 99 ? '99+' : unreadMessageCount}
              </Text>
            </View>
          ) : null}
          {conversationType === 0 ? (
            conversationAvatarUrl ? (
              <Avatar url={conversationAvatarUrl}></Avatar>
            ) : (
              <Image
                style={style.image}
                source={require('./resources/avatar-default.png')}
              ></Image>
            )
          ) : (
            <Image
              style={style.image}
              source={require('./resources/avatar-group.png')}
            ></Image>
          )}
        </View>
        <View style={style.itemContent}>
          <View style={style.main}>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {conversationName
                ? conversationName
                : conversationType === 0
                ? 'Chat'
                : 'Group Chat'}
            </Text>
            {!lastMessageBuilder ? (
              <Text
                style={style.message}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {lastMessage?.message}
              </Text>
            ) : (
              <Delegate to={lastMessageBuilder}></Delegate>
            )}
          </View>
          <View style={style.timeBox}>
            {!lastMessageTimeBuilder ? (
              <Text style={style.timeText}>
                {lastMessage?.timestamp
                  ? dateFormat(lastMessage?.timestamp)
                  : ''}
              </Text>
            ) : (
              <Delegate to={lastMessageTimeBuilder}></Delegate>
            )}
          </View>
        </View>
        <Modal transparent={true} visible={menuVisible}>
          <TouchableWithoutFeedback onPress={onMenuMaskPress}>
            <View style={style.modalMask}></View>
          </TouchableWithoutFeedback>
          <View style={style.modalView}>
            <TouchableOpacity onPress={onDeletePress}>
              <View style={[style.modalItem, style.borderBottom]}>
                <Text style={style.text}>Delete</Text>
              </View>
            </TouchableOpacity>
            {conversationType === 2 ? (
              <TouchableOpacity onPress={onQuitPress}>
                <View style={[style.modalItem, style.borderBottom]}>
                  <Text style={style.text}>Quit</Text>
                </View>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity onPress={onCancelPress}>
              <View style={style.modalItem}>
                <Text style={[style.text, { color: 'red' }]}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  conversationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    height: 68,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  unreadBox: {
    position: 'absolute',
    zIndex: 2,
    top: -6,
    left: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  unreadMessage: {
    color: 'white',
    fontSize: 10,
  },
  avatar: {
    marginRight: 10,
  },
  image: {
    width: 44,
    height: 44,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    height: 68,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    maxWidth: 155,
    color: '#b1b4bb',
  },
  timeBox: {
    justifyContent: 'center',
  },
  timeText: {
    color: '#b8b8b8',
  },
  modalMask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
  },
  modalItem: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  text: {
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
});
export default Conversation;
