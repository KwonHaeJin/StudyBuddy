import { Dimensions, View, StyleSheet } from "react-native";
import WebView from "react-native-webview";

const deviceHeight = (Dimensions.get('window').height);
const deviceWidth = Dimensions.get('window').width;

function Home() {
  return (
    <View style={styles.container}>
      <WebView
          style={styles.webview}
          source={{ uri: 'http://172.30.1.78:3000/studyroom' }} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
});