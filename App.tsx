import { Dimensions, View, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const deviceHeight = (Dimensions.get('window').height);
const deviceWidth = Dimensions.get('window').width;
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <View style={styles.container}>
      <WebView
          style={styles.webview}
          source={{ uri: 'http://172.30.1.78:3000/studyroom' }} />
    </View>
  );
}

function List(){
  return (
    <View style={styles.container}>
      <WebView
          style={styles.webview}
          source={{ uri: 'http://172.30.1.78:3000/studyroom' }} />
    </View>
  );
};

function Mypage () {
  return (
    <View style={styles.container}>
      <WebView
          style={styles.webview}
          source={{ uri: 'http://172.30.1.78:3000/feed' }} />
    </View>
  );
};

function Camera() {
  return (
    <View style={styles.container}>
      <WebView
          style={styles.webview}
          source={{ uri: 'http://172.30.1.78:3000/camera' }} />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeScreen" component={Home} />
        <Tab.Screen name="ListScreen" component={List} />
        <Tab.Screen name="CameraScreen" component={Camera} />
        <Tab.Screen name="MypageScreen" component={Mypage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

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