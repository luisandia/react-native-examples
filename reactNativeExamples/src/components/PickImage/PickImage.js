import React, { Component } from 'react'
import { View, Image, Button, StyleSheet } from 'react-native';
import imagePlaceHolder from '../../assets/background.jpg';

import ImagePicker from 'react-native-image-picker';

export class PickImage extends Component {

    state = {
        pickedImage: null
    }

    pickImagehandler = () => {
        ImagePicker.showImagePicker({ title: 'Pickan image', maxHeight: 600, maxWidth: 800 }, res => {
            if (res.didCancel) {
                console.log("User canceled");
            } else if (res.error) {
                console.error(res.error)
            } else {
                this.setState({
                    pickedImage: { uri: res.uri }
                })
                this.props.onImagePicked({ uri: res.uri, base64: res.data })
            }
        })
    }

    reset = () => {
        this.setState({
            pickedImage: null
        })
    }
    render() {
        return (
            <>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.previewImage} />
                </View>
                <View style={styles.button}>
                    <Button title="Pick image" onPress={this.pickImagehandler} />
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
