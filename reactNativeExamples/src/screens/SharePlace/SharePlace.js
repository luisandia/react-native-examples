import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
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
        placeName: "",
        controls: {
            location: {
                value: null,
                valid: false
            },
            image: {
                value: null,
                valid: false
            }
        },
    }

    placeNameChangeHandler = val => {
        this.setState({
            placeName: val
        })
    }


    locationPickedHandler = (location) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }

    imagePickedHandler = (image) => {
        this.setState(prevstate => {
            return {
                controls: {
                    ...prevstate.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
    }
    placeAddedHandler = () => {
        if (this.state.placeName.trim() !== '') {
            this.props.onAddPlace(this.state.placeName, this.state.controls.location.value, this.state.controls.image.value);
        }
    }

    render() {
        console.log(this.props)
        let submitButton = <Button title="Share the place" onPress={this.placeAddedHandler} />;

        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText style={{ color: "black" }}>Share a place with us </HeadingText>
                    </MainText>
                    <PickImage onImagePicked={this.imagePickedHandler} />
                    <PickLocation onLocationPick={this.locationPickedHandler} />
                    <PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangeHandler} />
                    <View style={styles.button}>
                        {submitButton}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = ({ ui: isLoading }) => {
    return isLoading
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, my_location, image) => dispatch(addPlace(placeName, my_location, image)),
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

export default connect(mapStateToProps, mapDispatchToProps)(SharePlace);
