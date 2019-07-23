import React from 'react';
import { createBottomTabNavigator } from 'react-navigation'

import Dashboard from '../components/Main/Dashboard'
import Profile from '../components/Main/Profile'
import Icon from 'react-native-vector-icons/Ionicons';
import SharePlace from '../SharePlace/SharePlace';
import FindPlace from '../FindPlace/FindPlace';


const MainTabs = createBottomTabNavigator({
    FindPlace: {
        screen: FindPlace,
        navigationOptions: {
            tabBarLabel: "Find Place",
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon size={25} name="md-map" color={tintColor} />;
            },
            tabBarOptions: {
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            },
        }
    },
    SharePlace: {
        screen: SharePlace,
        navigationOptions: {
            tabBarLabel: "Share Place",
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon size={25} name="ios-share-alt" color={tintColor} />
            ),
        }
    },

},

);

export default MainTabs

