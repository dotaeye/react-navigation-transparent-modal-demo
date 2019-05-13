import React from "react";
import {
  Text,
  View,
  Keyboard,
  Platform,
  TextInput,
  LayoutAnimation,
  TouchableOpacity
} from "react-native";
import { createForm } from "rc-form";

import styles from "./styles";

const animationsConfig = {
  layout: {
    spring: {
      duration: 400,
      create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 400
      }
    },
    easeInEaseOut: {
      duration: 400,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut
      }
    }
  }
};

class ReplyBar extends React.Component {
  state = {
    isOpen: false,
    disabled: false
  };

  componentWillMount() {
    const updateListener =
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
    const resetListener =
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";
    this._listeners = [
      Keyboard.addListener(updateListener, this.updateKeyboardSpace),
      Keyboard.addListener(resetListener, this.resetKeyboardSpace)
    ];
  }

  componentWillUnmount() {
    this._listeners.forEach(listener => listener.remove());
  }

  updateKeyboardSpace = e => {
    this.setState(
      {
        isOpen: true
      },
      () => {
        LayoutAnimation.configureNext(animationsConfig.layout.spring);
      }
    );
    const scrollViewRef = this.props.getSrollViewRef();
    if (scrollViewRef) {
      scrollViewRef.setNativeProps({
        styles: {
          height: this.props.scrollViewHeight - e.endCoordinates.height - 70
        }
      });
    }
  };

  resetKeyboardSpace = () => {
    this.setState(
      {
        isOpen: false
      },
      () => {
        LayoutAnimation.configureNext(animationsConfig.layout.spring);
      }
    );
    const scrollViewRef = this.props.getSrollViewRef();
    if (scrollViewRef) {
      scrollViewRef.setNativeProps({
        styles: {
          height: this.props.scrollViewHeight - e.endCoordinates.height - 70
        }
      });
    }
  };

  onClearReply = () => {
    this.input.setNativeProps({
      text: ""
    });
    this.textInputValue = "";
    this.input.blur();
    this.setState({
      disabled: false
    });
  };

  resetEnabled = () => {
    this.setState({
      disabled: false
    });
  };

  render() {
    const { isOpen } = this.state;
    const {
      placeholder,
      form: { getFieldDecorator }
    } = this.props;
    return (
      <View style={[styles.container, isOpen && styles.containerOpen]}>
        {isOpen && (
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => {
                this.input.blur();
              }}
              style={styles.topBarBtn}
            >
              <Text style={styles.topBarBtnText}>取消</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.topBarBtn}>
              <Text style={styles.topBarBtnText}>发布</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.bar, isOpen && styles.barOpen]}>
          <View
            style={[styles.inputWrapper, isOpen && styles.inputWrapperOpen]}
          >
            {getFieldDecorator("replyContent")(
              <TextInput
                autoFocus
                multiline
                underlineColorAndroid={"transparent"}
                blurOnSubmit={false}
                maxLength={300}
                placeholder={placeholder}
                ref={ref => (this.input = ref)}
                style={[styles.input, isOpen && styles.inputOpen]}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default createForm()(ReplyBar);
