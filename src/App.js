import React from "react";
import {
  View,
  Text,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  NavigationEvents
} from "react-navigation";

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
        <Text>Home Screen</Text>
        <Button
          title="跳转"
          onPress={() => {
            this.props.navigation.navigate("Detail");
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
    Demo: TransparentNavigator
  },
  {
    mode: "modal",
    headerMode: "none",
    cardShadowEnabled: false,
    cardStyle: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      opacity: 1
    }
  }
);

export default createAppContainer(AppNavigator);
