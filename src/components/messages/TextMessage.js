import { StyleSheet, View, Text } from 'react-native';
function TextMessages(props) {
  const { text, backgroundColor, color } = props;
  return (
    <View style={[style.container, { backgroundColor }]}>
      <Text style={[style.text, { color }]}>{text}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    maxWidth: '60%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 15,
  },
});
export default TextMessages;
