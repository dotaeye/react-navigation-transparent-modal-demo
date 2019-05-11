import React from "react";

import { View, StyleSheet, FlatList, Text, Dimensions } from "react-native";

import ParallaxScrollView from "react-native-parallax-scroll-view";

const { width, height } = Dimensions.get("window");
const color = {
  white: "#fff"
};

const navBarHeight = 64;
const topHeight = 50;
const imgHeight = 200;
const toolbarHeight = 40;

const stickyHeaderHeight = navBarHeight + toolbarHeight;
const parallaxHeaderHeight =
  navBarHeight + topHeight + toolbarHeight + imgHeight;

export default class ParallelScrollDemo extends React.Component {
  renderBackground = () => {
    return <View key="background" style={styles.background} />;
  };

  renderParallaxHeader = () => {
    return (
      <View key="parallaxHeader" style={styles.parallaxHeader}>
        <View style={styles.top}>
          <Text>这里是top的内容</Text>
        </View>
        <View style={styles.img}>
          <Text>这里是图片的内容，高度可以提前算出</Text>
        </View>
        <View style={styles.toolbar}>
          <Text>这里是下面的toolbar的高度，可以fixed</Text>
        </View>
      </View>
    );
  };

  renderFixedHeader = () => {
    return (
      <View key="fixedHeader" style={styles.fixedHeader}>
        <Text>我是fixedHeader</Text>
      </View>
    );
  };

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.flatItem}>
        <Text>我是item{index}</Text>
      </View>
    );
  };

  render() {
    const data = new Array(30).fill(0).map((v, index) => {
      return { key: index.toString() };
    });
    return (
      <FlatList
        ref={ref => (this.sectionList = ref)}
        renderItem={this.renderItem}
        initialNumToRender={20}
        data={data}
        keyExtractor={item => item.key}
        renderScrollComponent={props => (
          <ParallaxScrollView
            headerBackgroundColor={color.white}
            stickyHeaderHeight={stickyHeaderHeight}
            parallaxHeaderHeight={parallaxHeaderHeight}
            backgroundColor={color.white}
            contentBackgroundColor={color.white}
            renderBackground={() => this.renderBackground()}
            renderForeground={() => this.renderParallaxHeader()}
            renderFixedHeader={() => this.renderFixedHeader()}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height: parallaxHeaderHeight,
    justifyContent: "center",
    alignItems: "center"
  },
  top: {
    width,
    height: topHeight,
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width,
    height: imgHeight,
    justifyContent: "center",
    alignItems: "center"
  },
  toolbar: {
    width,
    height: toolbarHeight,
    justifyContent: "center",
    alignItems: "center"
  },
  parallaxHeader: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: navBarHeight,
    height: parallaxHeaderHeight
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    width,
    height: navBarHeight,
    paddingTop: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  flatItem: {
    height: 60,
    width,
    justifyContent: "center",
    alignItems: "center"
  }
});
