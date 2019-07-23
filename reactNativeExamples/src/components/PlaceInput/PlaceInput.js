import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native';

export class PlaceInput extends Component {
    state = {
        placename: ""
    }

    placeNameChangeHandler = val => {
        this.setState({
            placeName: val
        })
    }

    placeSubmitHandler = () => {
        console.log("PROPS EN INPUT")
        console.log(this.props)
        this.props.onAddPlace(this.state.placeName);
    }

    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.placeInput}
                    placeholder="Put your text"
                    value={this.state.placeName} onChangeText={this.placeNameChangeHandler} />
                <Button title="Add" style={styles.placeButton} onPress={this.placeSubmitHandler} />
            </View>
        )
    }
}



const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    placeInput: {
        width: "70%",
    },
    placeButton: {
        width: "30%"
    },


});

export default PlaceInput
