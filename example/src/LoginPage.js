import { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { randomName } from './utils';
import { ZIMKit } from '@zegocloud/zimkit-rn';
import appConfig from './KeyCenter';

export default function LoginPage(props) {
  const insets = useSafeAreaInsets();
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  useEffect(() => {
    ZIMKit.getInstance().init(appConfig.appID, appConfig.appSign);
    reload();
  }, []);
  const reload = () => {
    setUserID(String(Math.floor(Math.random() * 100000)));
    setUserName(randomName());
  };
  const navigation = useNavigation();
  const login = () => {
    ZIMKit.getInstance()
      .connectUser({ userID, userName }, '')
      .then((data) => {
        // sdk failed callback is [Error: login failed], no code.
        if (data === userID) {
          navigation.navigate('HomePage', {
            userID,
            userName,
          });
        }
      });
  };
  return (
    <View
      style={[
        style.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={style.inputBox}>
        <TextInput
          style={style.input}
          placeholder="User ID"
          value={userID}
          onChangeText={(text) => {
            setUserID(text);
          }}
        ></TextInput>
        <TextInput
          style={style.input}
          placeholder="User Name"
          value={userName}
          onChangeText={(text) => {
            setUserName(text);
          }}
        ></TextInput>
      </View>
      <View style={style.buttonBox}>
        <Button
          title="Login"
          disabled={!userID || !userName}
          onPress={login}
        ></Button>
        <Button title="Reload" onPress={reload}></Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {},
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
});
