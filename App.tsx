import { Dimensions, View, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import React from 'react';
import { Image } from 'react-native';
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
          source={{ uri: 'http://192.168.68.114:3000/studyroom' }} />
    </View>
  );
}

function List(){
  return (
    <View style={styles.container}>
      <WebView
          style={styles.webview}
          source={{ uri: 'http://192.168.68.114:3000/studyroom' }} />
    </View>
  );
};

function Mypage () {
  return (
    <View style={styles.container}>
      <WebView
          style={styles.webview}
          source={{ uri: 'http://192.168.68.114:3000/feed' }} />
    </View>
  );
};

function Camera() {
  return (
    <View style={styles.container}>
      <WebView
          style={styles.webview}
          source={{ uri: 'http://192.168.68.114:3000/camera' }} />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            // 각 탭 화면에 따라 다른 이미지 아이콘 사용
            let iconSource;

            if (route.name === 'HomeScreen') {
              iconSource = require('./assets/image/homeIcon.png');
            } else if (route.name === 'ListScreen') {
              iconSource = require('./assets/image/todooIcon.png');
            } else if (route.name === 'CameraScreen') {
              iconSource = require('./assets/image/cameraIcon.png');
            } else if (route.name === 'MypageScreen') {
              iconSource = require('./assets/image/feedIcon.png');
            }

            // 아이콘 이미지 컴포넌트 반환
            return (
              <Image
                source={iconSource}
                style={{ width: 24, height: 24, tintColor:color }}
                resizeMode="contain"
              />
            );
          },
          headerShown: false,
          tabBarShowLabel: false, // 라벨 숨기기
          tabBarActiveTintColor: '#FF7A00', // 활성화 상태 색상 (필요 시)
          tabBarInactiveTintColor: 'black', // 비활성화 상태 색상 (필요 시)
        })}>
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