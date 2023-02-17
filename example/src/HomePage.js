import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
  TextInput,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import HomePagePopUp from './HomePagePopUp';
import PeerChatDialog from './dialog/PeerChatDialog';
import GroupChatDialog from './dialog/GroupChatDialog';
import JoinGroupChatDialog from './dialog/JoinGroupChatDialog';
import { ZIMKit, ConversationList } from '@zegocloud/zimkit-rn';
import { ZegoSendCallInvitationButton } from "@zegocloud/zego-uikit-prebuilt-call-rn";

export default function HomePage(props) {
  const { route } = props;
  const { params } = route;
  const { userID, userName } = params;
  const [menuVisible, setMenuVisible] = useState(false);
  const [peerDialogVisible, setPeerDialogVisible] = useState(false);
  const [groupDialogVisible, setGroupDialogVisible] = useState(false);
  const [joinGroupDialogVisible, setJoinGroupDialogVisible] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const navigation = useNavigation();

  const exit = () => {
    navigation.navigate('LoginPage');
    ZIMKit.disconnectUser();
  };
  const openMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const onModalMaskPress = () => {
    setMenuVisible(!menuVisible);
  };
  const onNewPeerChatPress = () => {
    setMenuVisible(!menuVisible);
    setPeerDialogVisible(true);
  };
  const onNewGroupChatPress = () => {
    setMenuVisible(!menuVisible);
    setGroupDialogVisible(true);
  };
  const onJoinGroupChatPress = () => {
    setMenuVisible(!menuVisible);
    setJoinGroupDialogVisible(true);
  };
  const onPeerDialogVisibleChanged = (visible) => {
    setPeerDialogVisible(visible);
  };
  const onGroupDialogVisibleChanged = (visible) => {
    setGroupDialogVisible(visible);
  };
  const onJoinGroupDialogVisibleChanged = (visible) => {
    setJoinGroupDialogVisible(visible);
  };
  const lastMessageTimeBuilder = () => {
    return <Text>lastMessageTimeBuilder</Text>;
  };
  const lastMessageBuilder = () => {
    return <Text>lastMessageBuilder</Text>;
  };
  const onPressed = (props) => {
    const itemBuilder = () => {
      return (
        <View>
          <Text>item Builder</Text>
        </View>
      );
    };
    const loadingBuilder = () => {
      return (
        <View>
          <Text>loading Builder</Text>
        </View>
      );
    };
    const errorBuilder = () => {
      return (
        <View>
          <Text>error Builder</Text>
        </View>
      );
    };
    const preMessageSending = (message) => {
      return message;
    };
    console.log('#######props', props);
    navigation.navigate('MessageListPage', {
      ...props,
      preMessageSending,
      appBarActions: props.conversationType === 0 ? [
        {
          icon: 'goBack',
          onPressed: () => {
            navigation.goBack();
          },
        },
        () => <ZegoSendCallInvitationButton
          invitees={[{userID: props.conversationID, userName: props.conversationName }]}
        />,
        () => <ZegoSendCallInvitationButton
          isVideoCall={true}
          invitees={[{userID: props.conversationID, userName: props.conversationName }]}
        />
      ] : [{
        icon: 'goBack',
        onPressed: () => {
          navigation.goBack();
        },
      }],
    });
  };
  const onLongPress = () => {
    console.log('onLongPress');
  };
  const errorBuilder = () => {
    return (
      <View style={style.errorView}>
        <Text>error view</Text>
      </View>
    );
  };
  const emptyBuilder = () => {
    return (
      <View style={style.emptyView}>
        <Text>No chats.</Text>
        <Text>Start chatting now.</Text>
      </View>
    );
  };
  const loadingBuilder = () => {
    return (
      <View style={style.emptyView}>
        <ActivityIndicator />
      </View>
    );
  };
  const itemBuilder = () => {
    return (
      <View style={style.conversationItem}>
        <Text>custom conversation item</Text>
      </View>
    );
  };

  const filterConversation = () => {
    setIsFilter(!isFilter);
    setFilterValue('');
  };

  const filter = (conversationList) => {
    let filteredList = [];
    if (filterValue) {
      filteredList = conversationList.filter((item) =>
        item.conversationName.includes(filterValue)
      );
    } else {
      filteredList = conversationList;
    }
    return filteredList;
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.appBar}>
        <TouchableWithoutFeedback onPress={exit}>
          <Image
            style={style.icon}
            source={require('./resources/icon-exit.png')}
          ></Image>
        </TouchableWithoutFeedback>
        <Text style={style.title}>In-app Chat({`${userID}`})</Text>
        <View style={style.utils}>
          {/* <TouchableWithoutFeedback onPress={filterConversation}>
            <Image
              style={[style.icon, { marginRight: 8 }]}
              source={require('./resources/icon-more.png')}
            ></Image>
          </TouchableWithoutFeedback> */}
          <TouchableWithoutFeedback onPress={openMenu}>
            <Image
              style={style.icon}
              source={require('./resources/icon-create.png')}
            ></Image>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {isFilter ? (
        <View style={style.inputBox}>
          <TextInput
            style={style.input}
            onChangeText={(text) => {
              setFilterValue(text);
            }}
            value={filterValue}
            placeholder="Search"
            // onFocus={onFocus}
            // onBlur={onBlur}
          ></TextInput>
        </View>
      ) : null}
      <HomePagePopUp
        visible={menuVisible}
        onModalMaskPress={onModalMaskPress}
        onNewPeerChatPress={onNewPeerChatPress}
        onNewGroupChatPress={onNewGroupChatPress}
        onJoinGroupChatPress={onJoinGroupChatPress}
      ></HomePagePopUp>
      <PeerChatDialog
        dialogVisible={peerDialogVisible}
        onDialogVisibleChanged={onPeerDialogVisibleChanged}
      ></PeerChatDialog>
      <GroupChatDialog
        dialogVisible={groupDialogVisible}
        onDialogVisibleChanged={onGroupDialogVisibleChanged}
      ></GroupChatDialog>
      <JoinGroupChatDialog
        dialogVisible={joinGroupDialogVisible}
        onDialogVisibleChanged={onJoinGroupDialogVisibleChanged}
      ></JoinGroupChatDialog>
      <View style={style.conversation}>
        <ConversationList
          filter={filter}
          // lastMessageBuilder={lastMessageBuilder}
          // lastMessageTimeBuilder={lastMessageTimeBuilder}
          onPressed={onPressed}
          // onLongPress={onLongPress}
          // errorBuilder={errorBuilder}
          // emptyBuilder={emptyBuilder}
          loadingBuilder={loadingBuilder}
          // itemBuilder={itemBuilder}
        ></ConversationList>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  title: {
    marginLeft: 18,
    fontSize: 18,
    fontWeight: 'bold',
  },
  utils: {
    flexDirection: 'row',
  },
  icon: {
    width: 36,
    height: 36,
  },
  inputBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
  },
  input: {
    paddingHorizontal: 20,
    width: '90%',
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  conversation: {
    flex: 1,
    width: '100%',
  },
  errorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  conversationItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    height: 68,
    backgroundColor: '#fff',
  },
});
