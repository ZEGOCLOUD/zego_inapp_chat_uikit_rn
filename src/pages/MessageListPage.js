import MessageList from '../components/MessageList';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import MessageInput from '../components/MessageInput';
import { useState } from 'react';

function MessageListPage(props) {
  const { route } = props;
  const { params } = route;
  const {
    conversationID,
    conversationName,
    conversationType,
    itemBuilder,
    loadingBuilder,
    errorBuilder,
    preMessageSending,
    appBarActions,
  } = params;
  const [isInputFocus, setIsInputFocus] = useState(false);

  const onInputFocus = () => {
    setIsInputFocus(true);
  };
  const onInputBlur = () => {
    setIsInputFocus(false);
  };
  const onGoBackPress = () => {
    console.log('===goback', appBarActions);
    appBarActions.forEach((item) => {
      if (item.icon === 'goBack') {
        item.onPressed();
      }
    });
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.topBar}>
        <View style={style.icon}>
          <TouchableWithoutFeedback onPress={onGoBackPress}>
            <Image
              source={require('./resources/icon-goback.png')}
              style={style.goBack}
            ></Image>
          </TouchableWithoutFeedback>
        </View>
        <Text style={style.topBarTitle}>
          {`${
            conversationName
              ? conversationName
              : conversationType === 0
              ? 'Chat'
              : 'Group Chat'
          }(${conversationID})`}
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        style={{
          flex: 1,
        }}
      >
        <MessageList
          conversationID={conversationID}
          conversationType={conversationType}
          isInputFocus={isInputFocus}
          itemBuilder={itemBuilder}
          loadingBuilder={loadingBuilder}
          errorBuilder={errorBuilder}
        ></MessageList>
        <MessageInput
          conversationID={conversationID}
          conversationType={conversationType}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          preMessageSending={preMessageSending}
        ></MessageInput>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBar: {
    height: 50,
  },
  icon: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  goBack: {
    width: 36,
    height: 36,
  },
  topBarTitle: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 50,
  },
});
export default MessageListPage;
