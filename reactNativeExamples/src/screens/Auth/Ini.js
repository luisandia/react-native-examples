import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthScreen from './Auth';
import MainTabs from '../MainTabs/MainTabs';








class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Login: AuthScreen,
    App: AppStack,
    Auth: AuthStack,
    LoggedIn: {
      screen: MainTabs
    },
  },
  {
    // initialRouteName: 'AuthLoading',
    initialRouteName: 'Login',
  }
));


// import React, { Component } from 'react'
// import { View, ActivityIndicator, StyleSheet } from 'react-native'
// import { createSwitchNavigator, createAppContainer } from "react-navigation";
// import LoggedOutNavigator from './LoggedOut'
// import LoggedInNavigator from './LoggedIn'
// // import Auth from './Auth';
// import App from '../../../App';
// // import  getRootNavigator  from './Auth'

// class Root extends Component {
//   constructor(props) {
//     super(props);
//     console.disableYellowBox = true;

//     this.state = {
//       loading: false,
//       loggedIn: true
//     };
//   }

//   componentDidMount() {
//     this.props.navigation.navigate(this.state.loggedIn ? 'LoggedIn' : 'LoggedOut');
//   }

//   render() {
//     if (this.state.loading) {
//       return (
//         <View style={styles.base}>
//           <ActivityIndicator size='small' />
//         </View>
//       )
//     }else {
//       return <View></View>
//     }



//   }
// }

// const styles = StyleSheet.create({
//   base: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })

// export default createAppContainer(createSwitchNavigator(
//   {
//     LoggedOut: {
//       screen: LoggedOutNavigator
//     },
//     LoggedIn: {
//       screen: LoggedInNavigator
//     },
//     AuthLoading: Root
//   },
//   {
//     initialRouteName: 'Login'
//   }
// ));
