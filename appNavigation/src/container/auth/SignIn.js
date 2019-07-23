import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { removeListeners } from "../../utilities/listeners";
import { goHome } from "../../config/navigation";
import * as AppAction from "../../actions";
import FormTextInput from "../../components/common/FormTextInput";
import AuthButton from "../../components/common/AuthButton";
import constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

let removeListener = true;

class SignIn extends React.Component {
  static options(passProps) {
    return {};
  }
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  componentWillUnmount() {
    if (removeListener) {
      removeListeners();
    }
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };
  signIn = () => {
    const { username, password } = this.state;
    removeListener = false;
    this.props.AppAction.login();
    goHome();
  };
  forgotPassword = () => {
    this.props.AppAction.pushToParticularScreen(
      this.props.componentId,
      "ForgotPassword"
    );
  };
  signUp = () => {
    this.props.AppAction.pushToParticularScreen(
      this.props.componentId,
      "SignUp"
    );
  };
  render() {
    console.log("proppsss", this.props);
    return (
      <ScrollView
        style={{ height: constants.BaseStyle.DEVICE_HEIGHT }}
        scrollEnabled={false}
        enableAutomaticScroll
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={{ flex: 0.1 }} />
          <View
            style={{
              flex: 0.1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: moderateScale(10)
            }}
          >
            <Image
              style={{
                height: moderateScale(80),
                width: moderateScale(80)
              }}
              source={constants.Images.Common.logoBase64}
            />
          </View>
          <KeyboardAwareScrollView
            style={{
              maxHeight: constants.BaseStyle.DEVICE_HEIGHT * 0.5,
              minHeight: constants.BaseStyle.DEVICE_HEIGHT * 0.4
            }}
            keyboardShouldPersistTaps="handled"
            enableAutomaticScroll
            scrollEnabled
          >
            <FormTextInput
              icon={"user"}
              placeHolderText={"user name or email"}
            />
            <FormTextInput
              icon={"lock"}
              secureText
              placeHolderText={"Password"}
            />
            <AuthButton
              onPress={this.signIn}
              buttonName="Login"
              gradientColors={["#f55010", "#f55010"]}
              textStyle={{ color: constants.Colors.White }}
            />
          </KeyboardAwareScrollView>

          <View
            style={{
              flex: 0.1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              onPress={this.forgotPassword}
              style={{
                justifyContent: "center",
                alignItems: "center",
                fontSize: moderateScale(16),
                fontWeight: "bold",
                paddingVertical: moderateScale(20)
              }}
            >
              Forgot Password
            </Text>
          </View>
          <View style={{ flex: 0.3 }}>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: moderateScale(60)
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  width: constants.BaseStyle.DEVICE_WIDTH * 0.3
                }}
              />
              <Text
                style={{
                  fontSize: moderateScale(16)
                }}
              >
                Or
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  width: constants.BaseStyle.DEVICE_WIDTH * 0.3
                }}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(16),
                  paddingVertical: moderateScale(20)
                }}
              >
                Login With
              </Text>
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: constants.BaseStyle.DEVICE_WIDTH * 0.3
                }}
              >
                <TouchableOpacity>
                  <Icon name={"facebook-square"} size={50} color={"#3b5998"} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name={"twitter-square"} size={50} color={"#38A1F3"} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row"
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    paddingVertical: moderateScale(20)
                  }}
                >
                  {"Don’t Have an Account? "}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    fontWeight: "bold",
                    color: "#f55010",
                    paddingVertical: moderateScale(20)
                  }}
                  onPress={() => this.signUp()}
                >
                  SignUp
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  app: state.app
});
const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

const styles = StyleSheet.create({
  input: {
    width: 350,
    fontSize: 18,
    fontWeight: "500",
    height: 55,
    backgroundColor: "#42A5F5",
    margin: 10,
    color: "white",
    padding: 8,
    borderRadius: 14
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly"
  }
});
