import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import Conversation from './Conversation';
import { useEffect, useState } from 'react';
import Delegate from 'react-delegate-component';
import ZIMKit from '../services/index';
import ZIMKitConversationCore from '../services/internal/ZIMKitConversationCore';

function ConversationList(props) {
  const {
    filter,
    sorter,
    onPressed,
    onLongPress,
    errorBuilder,
    emptyBuilder,
    loadingBuilder,
    lastMessageBuilder,
    lastMessageTimeBuilder,
    itemBuilder,
  } = props;
  const [conversationList, setConversationList] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof filter === 'function') {
      const filteredList = filter(conversationList);
      setFilteredList(filteredList);
      if (filteredList !== conversationList) {
        setIsFilter(true);
      }
    }
  }, [filter]);

  useEffect(() => {
    setIsLoading(true);
    ZIMKit.getInstance()
      .getConversationList()
      .then((data) => {
        setIsLoading(false);
        if (!data.code) {
          let sortedList = [];
          if (sorter) {
            sortedList = sorter(data);
          } else {
            sortedList = defaultSorter(data);
          }
          setConversationList(sortedList);
          setHasError(false);
        } else {
          setHasError(true);
        }
      });

    ZIMKit.getInstance().onConversationListChanged((conversationList) => {
      const data = [...conversationList];
      let sortedList = [];
      if (sorter) {
        sortedList = sorter(data);
      } else {
        sortedList = defaultSorter(data);
      }
      setConversationList(sortedList);
      ZIMKitConversationCore.getInstance().conversationList = sortedList;
    });
  }, []);

  const defaultSorter = (conversationList) => {
    const sortedConversationList = conversationList.sort(
      (a, b) => b.orderKey - a.orderKey
    );
    return sortedConversationList;
  };

  const defaultFilter = (conversationName) => {
    const filteredList = conversationList.filter(
      (item) => item.conversationName === conversationName
    );
    return filteredList;
  };

  const defaultErrorBuilder = () => {
    return (
      <View style={style.errorView}>
        <Text>error view</Text>
      </View>
    );
  };

  const defaultEmptyBuilder = () => {
    return (
      <View style={style.emptyView}>
        <Text>No conversation yet</Text>
      </View>
    );
  };

  const defaultLoadingBuilder = () => {
    return (
      <View style={style.loadingView}>
        <ActivityIndicator />
      </View>
    );
  };

  const onScrollToEnd = () => {
    if (conversationList.length >= 20) {
      ZIMKit.getInstance().loadMoreConversation();
    }
  };

  const renderItem = ({ item }) =>
    itemBuilder ? (
      <Delegate to={itemBuilder}></Delegate>
    ) : (
      <Conversation
        conversationID={item.conversationID}
        conversationName={item.conversationName}
        conversationType={item.type}
        conversationAvatarUrl={item.conversationAvatarUrl}
        lastMessage={item.lastMessage}
        lastMessageBuilder={lastMessageBuilder}
        lastMessageTimeBuilder={lastMessageTimeBuilder}
        onPressed={onPressed}
        onLongPress={onLongPress}
        unreadMessageCount={item.unreadMessageCount}
      />
    );

  return (
    <View style={style.container}>
      {isLoading ? (
        <Delegate
          to={loadingBuilder ? loadingBuilder : defaultLoadingBuilder}
        ></Delegate>
      ) : !hasError ? (
        conversationList.length ? (
          <FlatList
            data={isFilter ? filteredList : conversationList}
            renderItem={renderItem}
            keyExtractor={(item) => item.conversationID}
            onEndReachedThreshold={0}
            onEndReached={onScrollToEnd}
          />
        ) : (
          <Delegate
            to={emptyBuilder ? emptyBuilder : defaultEmptyBuilder}
          ></Delegate>
        )
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
  },
  loadingView: {
    flex: 1,
  },
  errorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ConversationList;
