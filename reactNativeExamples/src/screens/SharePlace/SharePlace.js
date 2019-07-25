import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace, deletePlace, selectPlace, deselectPlace } from '../../store/actions/index';
import DefaultInput from '../../components/UI/DefaultInput';
import MainText from '../../components/UI/MainText/MainText';

import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

class SharePlace extends Component {

    state = {
        placeName: ""
    }

    placeNameChangeHandler = val => {
        this.setState({
            placeName: val
        })
    }




    placeAddedHandler = () => {
        if (this.state.placeName.trim() !== '')
            this.props.onAddPlace(this.state.placeName);
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText style={{ color: "black" }}>Share a place with us </HeadingText>
                    </MainText>
                    <PickImage />
                    <PickLocation />
                    <PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangeHandler} />
                    <View style={styles.button}>
                        <Button title="Share the place" onPress={this.placeAddedHandler} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.places
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName)),
        // onDeletePlace: () => dispatch(deletePlace()),
        // onSelectPlace: (key) => dispatch(selectPlace(key)),
        // onDeselectPlace: () => dispatch(deselectPlace())
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
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

export default connect(null, mapDispatchToProps)(SharePlace);
