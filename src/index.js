// import { NativeModules, Platform } from 'react-native';

import ZIMKitClass from './services/index';
import ConversationList from './components/ConversationList';
import MessageListPage from './pages/MessageListPage';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

const ZIMKit = ZIMKitClass.getInstance();

export { ZIMKit, ConversationList, MessageListPage, MessageList, MessageInput };
