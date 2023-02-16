import { StyleSheet, View, Image } from 'react-native';
import { useEffect } from 'react';

function Avatar(props) {
  const { url } = props;

  return (
    <View style={style.avatarBox}>
      <Image
        style={style.image}
        source={{
          uri: url,
        }}
      ></Image>
    </View>
  );
}

const style = StyleSheet.create({
  avatarBox: {
    flex: 1,
  },
  image: {
    width: 44,
    height: 44,
  },
});
export default Avatar;
