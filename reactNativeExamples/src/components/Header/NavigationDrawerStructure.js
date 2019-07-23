import React, { Component } from 'react';

import { View, Image, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class NavigationDrawerStructure extends Component {
    //Structure for the Left navigation
    toggleDrawer = () => {
        this.props.toggleDrawer();
    };

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.toggleDrawer}>
                    {/*Donute Button Image */}
                    {/* <Image
                        source={require('../../assets/drawer.png')}
                        style={{ width: 25, height: 25, marginLeft: 5 }}
                    /> */}
                    <Icon size={25} name="ios-menu"
                        style={{ marginLeft: 5 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}