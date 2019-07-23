import React, { Fragment } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AppAction from "../../actions";
import FormTextInput from "../../components/common/FormTextInput";
import AuthButton from "../../components/common/AuthButton";
import constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class ForgotPassword extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    phone_number: ""
  };
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  ForgotPassword = async () => {
    const { username, password, email, phone_number } = this.state;
    try {
      console.log("user successfully signed up!: ", success);
    } catch (err) {
      console.log("error signing up: ", err);
    }
  };
  render() {
    return (
      <View style={styles.container}>
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
            maxHeight: constants.BaseStyle.DEVICE_HEIGHT * 0.75
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <FormTextInput icon={"envelope"} placeHolderText={"Email"} />

          <AuthButton
            buttonName="Forgot Password"
            gradientColors={["#f55010", "#f55010"]}
            textStyle={{ color: constants.Colors.White }}
          />
        </KeyboardAwareScrollView>
      </View>
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
)(ForgotPassword);

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: "#42A5F5",
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly"
  }
});
