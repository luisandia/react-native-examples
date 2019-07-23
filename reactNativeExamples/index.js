import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { Navigation } from "react-native-navigation";

import App from './App';
import { name as appName } from './app.json';
import configureStore from './src/store/configureStore';
// import Auth from './src/screens/Auth/Auth';
import Ini from './src/screens/Auth/Ini';

const store = configureStore();

const StartApp = () => {
    return (
        <Provider store={store}>
            <Ini />
        </Provider>
    )
}
AppRegistry.registerComponent(appName, () => StartApp);
// Navigation.registerComponent(`reactNativeExamples.StartApp`, () => Auth);
// Navigation.registerComponent(appName, () => require('./src/screens/Auth/Auth').default);

// Navigation.events().registerAppLaunchedListener(() => {
//     Navigation.setRoot({
//       root: {
//         component: {
//           name: appName
//         }
//       },
//     });
//   });