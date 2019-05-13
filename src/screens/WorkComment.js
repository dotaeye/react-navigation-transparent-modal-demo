import React from "react";

import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
  Animated,
  RefreshControl,
  TouchableOpacity,
  TextInput
} from "react-native";

const { width, height } = Dimensions.get("window");
const color = {
  white: "#fff"
};

const navBarHeight = 64;
const topHeight = 50;
const imgHeight = 200;
const toolbarHeight = 30;
const bottomHeight = 60;

export default class WorkComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textHeight: 0,
      scrollY: new Animated.Value(0),
      bottomPosition: new Animated.Value(0),
      data: new Array(30).fill(0).map((v, index) => {
        return { key: index.toString() };
      }),
      data2: new Array(5).fill(0).map((v, index) => {
        return { key: (index * 2).toString() };
      }),
      useData: true
    };
  }

  componentDidMount() {
    const showListener =
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
    const hideListener =
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";
    this._listeners = [
      Keyboard.addListener(showListener, this.keyboardWillShow),
      Keyboard.addListener(hideListener, this.keyboardWillHide)
    ];
    this.keyboardHeight = new Animated.Value(0);
  }

  componentWillUnmount() {
    this._listeners.forEach(listener => listener.remove());
  }

  keyboardWillShow = event => {
    this.setState(
      {
        showComment: true
      },
      () => {
        Animated.timing(this.state.bottomPosition, {
          duration: event.duration,
          toValue: event.endCoordinates.height
        }).start();
      }
    );
  };

  keyboardWillHide = event => {
    Animated.timing(this.state.bottomPosition, {
      duration: event.duration,
      toValue: 0
    }).start(() => {
      this.setState({
        showComment: false
      });
    });
  };

  renderParallaxHeader = () => {
    const { scrollY, textHeight } = this.state;
    const parallaxHeaderHeight =
      topHeight + toolbarHeight + imgHeight + textHeight;
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, parallaxHeaderHeight - toolbarHeight],
      outputRange: [0, -parallaxHeaderHeight + toolbarHeight],
      extrapolate: "clamp"
    });

    return (
      <Animated.View
        key="parallaxHeader"
        style={[
          styles.parallaxHeader,
          { height: parallaxHeaderHeight },
          { transform: [{ translateY: headerTranslate }] }
        ]}
      >
        <View style={styles.top}>
          <Text>这里是top的内容</Text>
        </View>
        <View style={styles.img}>
          <Text>这里是图片的内容，高度可以提前算出</Text>
        </View>
        <View style={styles.text} onLayout={this.onTextLayout}>
          <Text>这里是图片的内容，高度可以提前算出</Text>
          <Text>这里是图片的内容，高度可以提前算出</Text>
          <Text>这里是图片的内容，高度可以提前算出</Text>
          <Text>这里是图片的内容，高度可以提前算出</Text>
          <Text>这里是图片的内容，高度可以提前算出</Text>
        </View>
        <View style={styles.toolbar}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                useData: true
              });
            }}
          >
            <Text>Tab1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                useData: false
              });
            }}
          >
            <Text>Tab2</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  renderFixedHeader = () => {
    const { scrollY } = this.state;
    const navTextOpacity = scrollY.interpolate({
      inputRange: [0, navBarHeight + topHeight],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });
    return (
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>我是导航</Text>

        <Animated.Text style={[styles.navbarText, { opacity: navTextOpacity }]}>
          隐藏内容
        </Animated.Text>
      </View>
    );
  };

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.flatItem}>
        <Text>我是item{item.key}</Text>
      </View>
    );
  };

  onTextLayout = event => {
    this.setState({
      textHeight: event.nativeEvent.layout.height
    });
  };

  onShowComment = () => {};

  onScrollToTop = () => {
    this.lastScrollOffset = this.offsetY;
    this.list._component.scrollToOffset({
      offset: 0
    });
  };

  onScrollToComment = () => {
    const { textHeight } = this.state;

    const parallaxHeaderHeight =
      topHeight + toolbarHeight + imgHeight + textHeight;

    const scrollOffset = this.lastScrollOffset
      ? this.lastScrollOffset
      : parallaxHeaderHeight - toolbarHeight;

    this.list._component.scrollToOffset({
      offset: scrollOffset
    });
  };

  render() {
    const {
      scrollY,
      textHeight,
      useData,
      data,
      data2,
      showComment
    } = this.state;
    const parallaxHeaderHeight =
      topHeight + toolbarHeight + imgHeight + textHeight;
    return (
      <View style={styles.container}>
        {this.renderFixedHeader()}
        <View style={styles.container}>
          <Animated.FlatList
            ref={ref => (this.list = ref)}
            contentContainerStyle={{
              paddingTop: parallaxHeaderHeight
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              {
                useNativeDriver: true,
                listener: event => {
                  this.offsetY = event.nativeEvent.contentOffset.y;
                }
              }
            )}
            renderItem={this.renderItem}
            data={useData ? data : data2}
            keyExtractor={item => item.key}
          />
          {this.renderParallaxHeader()}
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity onPress={this.onScrollToTop}>
            <Text>滚动顶</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onShowComment}>
            <Text>弹出评论</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onScrollToComment}>
            <Text>滚到固定位置</Text>
          </TouchableOpacity>
        </View>

        {showComment && (
          <Animated.View style={[styles.commentPanel]}>
            <TextInput
              multiline
              underlineColorAndroid={"transparent"}
              blurOnSubmit={false}
              maxLength={300}
              placeholder={placeholder}
              ref={ref => (this.input = ref)}
              style={[styles.input, isOpen && styles.inputOpen]}
            />
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wapper: {
    width,
    height: height - navBarHeight
  },

  navbar: {
    width,
    height: navBarHeight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#637233",
    paddingTop: 20,
    zIndex: 2
  },
  navbarText: {
    lineHeight: 44
  },
  text: {
    backgroundColor: "#423423",
    width,
    padding: 10
  },

  bottom: {
    width,
    height: bottomHeight,
    paddingBottom: 24,
    backgroundColor: "#ddd",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  top: {
    width,
    height: topHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)"
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
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ddd"
  },
  parallaxHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: color.white
  },

  flatItem: {
    height: 60,
    width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#263826"
  }
});
