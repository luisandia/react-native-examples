import React, { Component } from 'react'
import { View, Image, Button, StyleSheet, Text } from 'react-native';
import imagePlaceHolder from '../../assets/background.jpg';


export class PickLocation extends Component {
    render() {
        return (
            <>
                <View style={styles.placeholder}>
                    <Text>
                        Map
                            </Text>
                </View>
                <View style={styles.button}>
                    <Button title="Locate me" />
                </View>
            </>
        )
    }
}


const styles = StyleSheet.create({
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
})

export default PickLocation
