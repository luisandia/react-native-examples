import React, { Component } from 'react'
import { View, Image, Button,StyleSheet } from 'react-native';
import imagePlaceHolder from '../../assets/background.jpg';


export class PickImage extends Component {
    render() {
        return (
            <>
                <View style={styles.placeholder}>
                    <Image source={imagePlaceHolder} style={styles.previewImage} />
                </View>
                <View style={styles.button}>
                    <Button title="Pick image" />
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

export default PickImage
