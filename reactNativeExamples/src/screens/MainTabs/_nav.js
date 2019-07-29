//This is an example code for Navigation Drawer with Custom Side bar//
//This Example is for React Navigation 3.+//
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Button, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { authLogout } from '../../store/actions';

class CustomSidebarMenu extends Component {
    constructor() {
        super();
        //Setting up the Main Top Large Image of the Custom Sidebar
        this.proileImage =
            'http://aboutreact.com/wp-content/uploads/2018/07/sample_img.png';
        //Array of the sidebar navigation option with icon and screen to navigate
        //This screens can be any screen defined in Drawer Navigator in App.js
        //You can find the Icons from here https://material.io/tools/icons/
        this.items = [
            {
                navOptionThumb: 'camera',
                navOptionName: 'First Screen',
                screenToNavigate: 'Main',
            },
            {
                navOptionThumb: 'image',
                navOptionName: 'Second Screen',
                screenToNavigate: 'DetailStack',
            },
            {
                navOptionThumb: 'build',
                navOptionName: 'Logout',
                screenToNavigate: 'NavLogout',
            },
        ];
    }

    logout = ()=>{
        console.log("PROPS NAV")
        console.log(this.props)
        this.props.onLogout(this.props.navigation);
    }
    render() {
        return (
            <View style={styles.sideMenuContainer}>
                {/*Top Large Image */}
                <View style={{ width: '100%' }}>
                    <Image
                        source={{ uri: this.proileImage }}
                        style={styles.sideMenuProfileIcon}
                    />
                    {/*Divider between Top Image and Sidebar Option*/}
                    <View
                        style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#e2e2e2',
                            marginTop: 15,
                        }}
                    />
                </View>
                {/*Setting up Navigation Options from option array using loop*/}
                <View style={{ width: '100%', flex: 1 }}>
                    {this.items.map((item, key) => (
                        <View key={key}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: 10,
                                paddingBottom: 10,
                                backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
                            }}>
                            <View style={{ marginRight: 10, marginLeft: 20 }}>
                                <Icon name={item.navOptionThumb} size={25} color="#808080" />
                            </View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: global.currentScreenIndex === key ? 'red' : 'black',
                                }}
                                onPress={() => {
                                    global.currentScreenIndex = key;
                                    this.props.navigation.navigate(item.screenToNavigate);
                                }}>
                                {item.navOptionName}
                            </Text>
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={{ alignSelf: "flex-end", width: "100%" }} onPress={this.logout}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: 10,
                        paddingBottom: 10,
                    }}>
                        <View style={{ marginRight: 10, marginLeft: 20 }}>
                            <Icon name="build" size={25} color="#808080" />
                        </View>
                        <Text style={styles.label}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = ({ ui: isLoading }) => {
    return isLoading;
};

const mapDispatchToProps = dispatch => ({
    onLogout: (navigation) => dispatch(authLogout(navigation)),
    // onAutoSignIn: (navigation) => dispatch(authAutoSignIn(navigation))
})

export default connect(null, mapDispatchToProps)(CustomSidebarMenu);

const styles = StyleSheet.create({
    item: {
        alignSelf: "flex-start"
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, .87)',
    },
    iconContainer: {
        marginHorizontal: 16,
        width: 24,
        alignItems: 'center',
    },
    sideMenuContainer: {
        flex: 1,
        // justifyContent: 'space-between',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20,

    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 150,
        height: 150,
        marginTop: 20,
        marginLeft: 0,
        marginRight: 0,
        alignSelf: "center",
        borderRadius: 150 / 2,
    },
});
