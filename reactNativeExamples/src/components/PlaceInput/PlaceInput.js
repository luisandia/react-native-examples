import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native';
import DefaultInput from '../UI/DefaultInput';

export class PlaceInput extends Component {
    // state = {
    //     placename: ""
    // }

    // placeNameChangeHandler = val => {
    //     this.setState({
    //         placeName: val
    //     })
    // }


    render() {
        return (
            <DefaultInput
                placeholder="Place Name"
                value={this.props.placeName}
                onChangeText={this.props.onChangeText}
            />

        )
    }
}




export default PlaceInput

