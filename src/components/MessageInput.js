import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { ZIMKit } from '../index';

function MessageInput(props) {
  const {
    conversationID,
    conversationType,
    onFocus,
    onBlur,
    preMessageSending,
    showPickFileButton,
  } = props;
  const [value, onChangeText] = useState('');
  const [defaultInputHeight, setDefaultInputHeight] = useState(0);
  const [textInputHeight, setTextInputHeight] = useState(0);

  useEffect(() => {
    ZIMKit.onPreMessageSending(preMessageSending);
  }, []);

  const sendMessage = () => {
    if (value) {
      onChangeText('');
      setTextInputHeight(defaultInputHeight);
      ZIMKit.sendTextMessage(conversationID, conversationType, value);
    }
  };

  return (
    <View style={style.container}>
      <View style={[style.inputBox, { height: textInputHeight }]}>
        <TextInput
          style={style.input}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          multiline={true}
          onContentSizeChange={({
            nativeEvent: {
              contentSize: { width, height },
            },
          }) => {
            var h = height;
            if (!defaultInputHeight) {
              setDefaultInputHeight(h);
            }
            if (Platform.OS == 'ios') {
              h = height + 25;
            }
            setTextInputHeight(h);
          }}
        />
      </View>
      <View style={style.iconBox}>
        {/* {value ? ( */}
        <TouchableWithoutFeedback onPress={sendMessage}>
          <Image
            style={style.icon}
            source={require('./resources/icon-send.png')}
          ></Image>
        </TouchableWithoutFeedback>
        {/* ) : (
          <TouchableWithoutFeedback>
            <Image
              style={style.icon}
              source={require('./resources/icon-more.png')}
            ></Image>
          </TouchableWithoutFeedback>
        )} */}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputBox: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 12.5,
    paddingBottom: 12.5,
    borderRadius: 8,
    backgroundColor: '#f4f1f2',
  },
  iconBox: {},
  icon: {
    width: 34,
    height: 34,
  },
});
export default MessageInput;
