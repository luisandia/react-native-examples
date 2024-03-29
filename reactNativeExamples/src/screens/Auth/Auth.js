import React from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput';

import backgroundImage from '../../assets/background.jpg';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import MainText from '../../components/UI/MainText/MainText';
import validate from '../../../utility/validation';
import { connect } from 'react-redux';
import { tryAuth, authAutoSignIn } from '../../store/actions/index';
import SplashScreen from 'react-native-splash-screen'

class AuthScreen extends React.Component {

  static navigationOptions = {
    title: 'Login'
  };

  state = {
    viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    }
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles)

  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles)
  }

  switchAuthModeHandler = () => {
    this.setState(state => {
      return {
        authMode: state.authMode === "login" ? "signup" : "login"
      }
    })
  }

  updateStyles = (dims) => {
    this.setState(
      {
        viewMode: dims.window.height > 500 ? "portrait" : "landscape"
      }
    )
  }
  loginHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    }
    console.log(this.props)
    this.props.onLogin(authData, this.state.authMode, this.props.navigation);
    // this.props.navigation.navigate('LoggedIn');
  }

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      }
    }

    this.setState({

      controls: {
        ...this.state.controls,

        confirmPassword: {
          ...this.state.controls.confirmPassword,
          valid: key === 'password' ? validate(this.state.controls.password.value, this.state.controls.confirmPassword.validationRules, connectedValue) : this.state.controls.confirmPassword.valid,
          touched: true
        },
        [key]: {
          ...this.state.controls[key],
          value,
          valid: validate(value, this.state.controls[key].validationRules, connectedValue),
          touched: true
        },
      }
    });

  }
  formValid = () => {
    // let disabled = false;
    // for (const [key, value] of Object.entries(this.state.controls)) {
    //   if (!value.valid) {
    //     disabled = true;
    //     break;
    //   }
    // }
    return (
      !this.state.controls.confirmPassword.valid && this.state.authMode === "signup" ||
      !this.state.controls.email.valid ||
      !this.state.controls.password.valid);
  }

  componentDidMount() {
    SplashScreen.hide();
    this.props.onAutoSignIn(this.props.navigation);
  }
  render() {
    const enabled = this.formValid();
    let headingText = null;
    let confirmPasswordControl = null;
    let submitButton = (
      <ButtonWithBackground
        color="#29aaf4"
        onPress={this.loginHandler}
        disabled={
          enabled
        }
      >
        Submit
      </ButtonWithBackground>
    );
    let passwordContainer, passwordWrapper;
    console.log(Dimensions.get('window').height)
    if (this.state.viewMode === "portrait" || this.state.authMode === "login") {
      headingText = <MainText><HeadingText>Please Log in</HeadingText></MainText>
      passwordContainer = styles.portraitPasswordContainer
      passwordWrapper = styles.portraitPasswordWrapper
    } else {
      passwordContainer = styles.lanscapePasswordContainer
      passwordWrapper = styles.landscapePasswordWrapper
    }

    if (this.state.authMode === "signup") {
      confirmPasswordControl = <View style={passwordWrapper}>
        <DefaultInput placeholder="Confirm Password" style={styles.input}
          value={this.state.controls.confirmPassword.value}
          onChangeText={(val) => this.updateInputState('confirmPassword', val)}
          valid={this.state.controls.confirmPassword.valid}
          touched={this.state.controls.confirmPassword.touched}
          secureTextEntry
        />
      </View>
    }
    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {headingText}
          <ButtonWithBackground color="#29aaf4" onPress={this.switchAuthModeHandler}>Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"}</ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput placeholder="Your E-mail" style={styles.input}
                value={this.state.controls.email.value}
                onChangeText={(val) => this.updateInputState('email', val)}
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
              <View style={passwordContainer}>
                <View style={passwordWrapper}>
                  <DefaultInput placeholder="Password" style={styles.input}
                    value={this.state.controls.password.value}
                    onChangeText={(val) => this.updateInputState('password', val)}
                    valid={this.state.controls.password.valid}
                    touched={this.state.controls.password.touched}
                    secureTextEntry
                  />
                </View>
                {confirmPasswordControl}
              </View>
            </View>
          </TouchableWithoutFeedback>
          {submitButton}
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb",
  },
  lanscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
    width: "100%"
  }


});
const mapStateToProps = ({ ui: isLoading }) => {
  return isLoading;
};

const mapDispatchToProps = dispatch => ({
  onLogin: (authData, authMode, navigation) => dispatch(tryAuth(authData, authMode, navigation)),
  onAutoSignIn: (navigation) => dispatch(authAutoSignIn(navigation))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);