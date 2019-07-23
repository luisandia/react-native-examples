import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

class AuthScreen extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

  loginHandler = () => {
    this.props.navigation.navigate('LoggedIn');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Auth Screen</Text>
        <Button title="Login" onPress={this.loginHandler} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AuthScreen;