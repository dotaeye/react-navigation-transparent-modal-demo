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

import Task from "./Task";
import Nested from "./Nested";
import Work from "./Work";
import ParallelScroll from "./ParallelScroll";

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
        <Button
          title="Task"
          onPress={() => {
            this.props.navigation.navigate("Task");
          }}
        />
        <Button
          title="Nested"
          onPress={() => {
            this.props.navigation.navigate("Nested");
          }}
        />

        <Button
          title="Work"
          onPress={() => {
            this.props.navigation.navigate("Work");
          }}
        />
        <Button
          title="平行滚动"
          onPress={() => {
            this.props.navigation.navigate("ParallelScroll");
          }}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,

    Task,
    Work,
    Nested,
    ParallelScroll
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);
