import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import { ZIMKit } from '../index';
import React, { useEffect, useState, useRef } from 'react';
import Messages from './messages/Messages';
import Delegate from 'react-delegate-component';

function MessageList(props) {
  const {
    conversationID,
    conversationType,
    isInputFocus, // Internal use
    itemBuilder,
    loadingBuilder,
    errorBuilder,
  } = props;
  const [messageList, setMessageList] = useState([]);
  const flatListRef = useRef(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let groupMemberInfoList = [];

  useEffect(() => {
    if (isInputFocus) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd();
      }, 200);
    }
  }, [isInputFocus]);

  useEffect(() => {
    setIsLoading(true);
    ZIMKit.getMessageList(conversationID, conversationType).then((data) => {
      setIsLoading(false);
      if (!data.code) {
        data.sort((a, b) => a.orderKey - b.orderKey);
        setMessageList(data);
        // scroll to end
        setTimeout(() => {
          flatListRef.current?.scrollToEnd();
        }, 200);
        setHasError(false);
        if (conversationType === 2) {
          getGroupMemberInfoList(data);
        }
      } else {
        console.log('get message list err', data);
        setHasError(true);
      }
    });
    ZIMKit.onMessageListChanged((id, type, messageList) => {
      if (conversationID === id && conversationType === type) {
        const data = [...messageList];
        data.sort((a, b) => a.orderKey - b.orderKey);
        setMessageList(data);
        // clear unread count
        ZIMKit.clearUnreadCount(id, type);
        // scroll to end
        setTimeout(() => {
          flatListRef.current?.scrollToEnd();
        }, 200);
        if (conversationType === 2) {
          getGroupMemberInfoList(data);
        }
      }
    });
    return () => {
      // clear subscription
      ZIMKit.offMessageListChanged();
    };
  }, []);

  const getGroupMemberInfoList = async (messageList) => {
    let memberIDs = [];
    messageList.forEach((msg) => {
      if (!memberIDs.some((item) => item === msg.senderUserID)) {
        memberIDs.push(msg.senderUserID);
      }
    });
    memberIDs.forEach(async (id, index) => {
      await ZIMKit.queryGroupMemberInfo(id, conversationID).then((data) => {
        groupMemberInfoList.push(data.userInfo);
        messageList.forEach((msg) => {
          if (msg.senderUserID === id) {
            msg.userInfo = data.userInfo;
          }
        });
        setMessageList([...messageList]);
      });
    });
  };

  const refresh = () => {
    setIsRefreshing(true);
    ZIMKit.loadMoreMessage(conversationID, conversationType).then((data) => {
      if (!data.code) {
        data.sort((a, b) => a.orderKey - b.orderKey);
        setMessageList(data);
        setIsRefreshing(false);
      } else {
        console.log('load more message', data);
      }
    });
  };

  const defaultLoadingBuilder = () => {
    return (
      <View style={style.loadingView}>
        <ActivityIndicator />
      </View>
    );
  };

  const defaultErrorBuilder = () => {
    return (
      <View style={style.errorView}>
        <Text>error view</Text>
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <Messages
      index={index}
      item={item}
      conversationID={conversationID}
      conversationType={conversationType}
      messageList={messageList}
      itemBuilder={itemBuilder}
    ></Messages>
  );

  return (
    <View style={style.container}>
      {isLoading ? (
        <Delegate
          to={loadingBuilder ? loadingBuilder : defaultLoadingBuilder}
        ></Delegate>
      ) : !hasError ? (
        messageList.length ? (
          <FlatList
            contentContainerStyle={{ paddingTop: 16 }}
            ref={flatListRef}
            data={messageList}
            renderItem={renderItem}
            keyExtractor={(item) => item.localMessageID}
            refreshing={isRefreshing}
            onRefresh={refresh}
          />
        ) : null
      ) : (
        <Delegate
          to={errorBuilder ? errorBuilder : defaultErrorBuilder}
        ></Delegate>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f1f4',
  },
  errorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessageList;
