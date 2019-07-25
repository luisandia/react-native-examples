import React from 'react';
import { createBottomTabNavigator, createStackNavigator,createDrawerNavigator } from 'react-navigation'

import Icon from 'react-native-vector-icons/Ionicons';
import SharePlace from '../SharePlace/SharePlace';
import FindPlace from '../FindPlace/FindPlace';
import PlaceDetail from '../PlaceDetail/PlaceDetail';
import NavigationDrawerStructure from '../../components/Header/NavigationDrawerStructure';





const DetailStack = createStackNavigator({
    FindPlace: {
        screen: FindPlace,
        navigationOptions: ({ navigation }) => ({

            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerLeft: <NavigationDrawerStructure {...navigation} />,
        })
    }
    , PlaceDetail
});

const DetailNavigator = createDrawerNavigator({
    Main: DetailStack
})



const MainTabs = createBottomTabNavigator({
    DetailStack: {
        screen: DetailNavigator,
        navigationOptions: {
            tabBarLabel: "Find Place",
            tabBarIcon: ({ tintColor }) => {
                return <Icon size={25} name="md-map" color={tintColor} />;
            },
            tabBarOptions: {
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }
        }
    },
    SharePlace: {
        screen: SharePlace,
        navigationOptions: {
            tabBarLabel: "Share Place",
            tabBarIcon: ({ tintColor }) => (
                <Icon size={25} name="ios-share-alt" color={tintColor} />
            ),
        }
    }
},

    // {
    //     mode: 'modal',
    //     headerMode: 'none'
    // }

);

export default MainTabs

