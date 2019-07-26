import React from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions
} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput';

import backgroundImage from '../../assets/background.jpg';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import MainText from '../../components/UI/MainText/MainText';

class AuthScreen extends React.Component {

  static navigationOptions = {
    title: 'Login'
  };
  state = {
    viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape"
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles)

  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles)
  }

  updateStyles = (dims) => {
    this.setState(
      {
        viewMode: dims.window.height > 500 ? "portrait" : "landscape"
      }
    )
  }
  loginHandler = () => {
    this.props.navigation.navigate('LoggedIn');
  }

  render() {
    let headingText, passwordContainer, passwordWrapper;

    console.log(Dimensions.get('window').height)
    if (this.state.viewMode === "portrait") {
      headingText = <MainText><HeadingText>Please Log in</HeadingText></MainText>
      passwordContainer = styles.portraitPasswordContainer
      passwordWrapper = styles.portraitPasswordWrapper
    } else {
      passwordContainer = styles.lanscapePasswordContainer
      passwordWrapper = styles.landscapePasswordWrapper
    }



    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground color="#29aaf4">Switch to Login</ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput placeholder="Your E-mail" style={styles.input} />
            <View style={passwordContainer}>
              <View style={passwordWrapper}>
                <DefaultInput placeholder="Password" style={styles.input} />
              </View>
              <View style={passwordWrapper}>
                <DefaultInput placeholder="Confirm Password" style={styles.input} />
              </View>
            </View>
          </View>
          <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}> Submit</ButtonWithBackground>
        </View>
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

export default AuthScreen;