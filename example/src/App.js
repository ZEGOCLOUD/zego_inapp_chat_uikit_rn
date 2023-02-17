import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './AppNavigation';
import {
  ZegoCallInvitationDialog,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

export default function App() {
  return (
    <NavigationContainer>
      <ZegoCallInvitationDialog />
      <AppNavigation />
    </NavigationContainer>
  );
}
