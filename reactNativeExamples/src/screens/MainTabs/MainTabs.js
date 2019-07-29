import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { Dimensions, View, Text, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SharePlace from '../SharePlace/SharePlace';
import FindPlace from '../FindPlace/FindPlace';
import PlaceDetail from '../PlaceDetail/PlaceDetail';
import NavigationDrawerStructure from '../../components/Header/NavigationDrawerStructure';

import CustomSidebarMenu from './_nav';
import { Button } from 'react-native-elements';



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
export class Screen3 extends Component {
    //Screen3 Component
    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={{ fontSize: 23 }}> Logout {global.currentScreenIndex + 1} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    },
});


//Stack Navigator for the Third Option of Navigation Drawer
const logout_sn = createStackNavigator({
    //All the screen from the Third Option will be indexed here
    Third: {
        screen: Screen3,
        navigationOptions: ({ navigation }) => ({
            title: 'Logout',
            headerLeft: <NavigationDrawerStructure {...navigation} />,
            headerStyle: {
                backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
        }),
    },
});

const DetailNavigator = createDrawerNavigator({
    Main: {
        screen: DetailStack,
        navigationOptions: {
            drawerLabel: "Detalle",
            drawerIcon: ({ tintColor }) => (
                <Icon size={50} name="md-map" color={tintColor} />
            )
        }
    },
    NavLogout: {
        screen: logout_sn,
        navigationOptions: {
            drawerLabel: 'Demo Screen 3',
        },
    },
},
    {
        //For the Custom sidebar menu we have to provide our CustomSidebarMenu
        contentComponent: CustomSidebarMenu,
        //Sidebar width
        drawerWidth: Dimensions.get('window').width - 130,

    }
);



const MainTabs = createBottomTabNavigator({
    DetailStack: {
        screen: DetailNavigator,
        navigationOptions: {
            tabBarLabel: "Find Place",
            tabBarIcon: ({ tintColor }) => {
                return <Icon size={25} name={Platform.OS === 'android' ? "md-map" : "ios-map"} color={tintColor} />;
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
                <Icon size={25} name={Platform.OS === 'android' ? "md-share-alt" : "ios-share-alt"} color={tintColor} />
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

