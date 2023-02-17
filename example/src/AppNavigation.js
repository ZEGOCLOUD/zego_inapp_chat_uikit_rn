import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import { MessageListPage } from '@zegocloud/zimkit-rn';
import {
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const Stack = createNativeStackNavigator();

export default function AppNavigation(props) {
  const back = () => {
    return true;
  };

  return (
    <Stack.Navigator
      initialRouteName="LoginPage"
      screenListeners={{
        state: ({ data }) => {
          // first page not listening
          if (data.state.index) {
            BackHandler.addEventListener('hardwareBackPress', back);
          }
        },
        beforeRemove: (data) => {
          BackHandler.removeEventListener('hardwareBackPress', back);
        },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        headerMode="none"
        name="LoginPage"
        component={LoginPage}
      />
      {/* gestureEnabled only available for ios  */}
      <Stack.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name="HomePage"
        component={HomePage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MessageListPage"
        component={MessageListPage}
      />
      <Stack.Screen
          options={{ headerShown: false }}
          // DO NOT change the name 
          name="ZegoUIKitPrebuiltCallWaitingScreen"
          component={ZegoUIKitPrebuiltCallWaitingScreen}
      />
      <Stack.Screen
          options={{ headerShown: false }}
          // DO NOT change the name
          name="ZegoUIKitPrebuiltCallInCallScreen"
          component={ZegoUIKitPrebuiltCallInCallScreen}
      />
    </Stack.Navigator>
  );
}
