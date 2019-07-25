import React from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  ImageBackground
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

  loginHandler = () => {
    this.props.navigation.navigate('LoggedIn');
  }

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          <MainText><HeadingText>Please Log in</HeadingText></MainText>
          <ButtonWithBackground color="#29aaf4">Switch to Login</ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput placeholder="Your E-mail" style={styles.input} />
            <DefaultInput placeholder="Password" style={styles.input} />
            <DefaultInput placeholder="Confirm Password" style={styles.input} />
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
  }
});

export default AuthScreen;