import React from "react";
import {
  View,
  Text,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import PhotoView from "react-native-photo-view";

import {
  createStackNavigator,
  createAppContainer,
  NavigationEvents
} from "react-navigation";

import Photo from "./Photo";
import Previw from "./Preview";
const { width, height } = Dimensions.get("window");

function forVertical(props) {
  const { layout, position, scene } = props;

  const index = scene.index;
  const height = layout.initHeight;

  const translateX = 0;
  const translateY = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [height, 0, 0]
  });

  return {
    transform: [{ translateX }, { translateY }]
  };
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff"
        }}
      >
        <PhotoView
          source={{
            uri:
              "https://github.com/mariohahn/MHVideoPhotoGallery/raw/master/Images%20Github/dismissInteractive.gif"
          }}
          minimumZoomScale={0.5}
          maximumZoomScale={3}
          style={{
            width: 300,
            height: 300,
            justifyContent: "center",
            alignItems: "center"
          }}
        />
        <Button
          title="跳转"
          onPress={() => {
            this.props.navigation.navigate("Detail");
          }}
        />
        <Button
          title="照片"
          onPress={() => {
            this.props.navigation.navigate("Photo");
          }}
        />
      </View>
    );
  }
}

class DetailScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <NavigationEvents
          onWillFocus={payload => console.log("will focus", payload)}
          onDidFocus={payload => console.log("did focus", payload)}
          onWillBlur={payload => console.log("will blur", payload)}
          onDidBlur={payload => console.log("did blur", payload)}
        />
        <TouchableOpacity
          style={{
            width,
            height: 500
          }}
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "#632344",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text>Detail Screen</Text>

          <Button
            title="Detail 2 Screen"
            onPress={() => {
              this.props.navigation.navigate("Detail2");
            }}
          />
          <Button
            title="返回"
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        </View>
      </View>
    );
  }
}

class Detail2Screen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <TouchableOpacity
          style={{
            width,
            height: 500
          }}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "#632344",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text>Detail Screen</Text>
          <Button
            title="返回"
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        </View>
      </View>
    );
  }
}

const TransparentNavigator = createStackNavigator(
  {
    Detail: {
      screen: DetailScreen
    },
    Detail2: {
      screen: Detail2Screen
    }
  },
  {
    headerMode: "none",
    cardShadowEnabled: false,
    cardStyle: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      opacity: 1
    },
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: "rgba(0, 0, 0, 0)"
      }
    })
  }
);

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Demo: TransparentNavigator,
    Photo,
    Previw
  },
  {
    mode: "modal",
    headerMode: "none",
    cardShadowEnabled: false
    // cardStyle: {
    //   backgroundColor: "rgba(0, 0, 0, 0)",
    //   opacity: 1
    // }
  }
);

export default createAppContainer(AppNavigator);
