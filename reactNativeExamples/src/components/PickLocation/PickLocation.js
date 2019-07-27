import React, { Component } from 'react'
import { View, Image, Button, StyleSheet, Text, Dimensions } from 'react-native';
import imagePlaceHolder from '../../assets/background.jpg';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';

export class PickLocation extends Component {

    state = {
        focusedLocation: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.015,
        },
        locationChosen: false
    }
    pickLocationHandler = (e) => {
        const coords = e.nativeEvent.coordinate;
        this.map.animateToRegion({ ...this.state.focusedLocation, latitude: coords.latitude, longitude: coords.longitude })
        this.setState(prevstate => {
            return {
                focusedLocation: {
                    ...prevstate.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            }
        })
        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        });
    }

    getLocationHandler = () => {

        Geolocation.getCurrentPosition(pos => {
            console.log(pos)
            const coords = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coords);
        }, err => {
            console.error(err);
            alert("fetching position failed")
        });

    }
    render() {
        let marker = null;
        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />
        }
        return (
            <>
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        initialRegion={this.state.focusedLocation}
                        onPress={this.pickLocationHandler}
                        ref={ref => this.map = ref}
                    >
                        {marker}

                    </MapView>
                </View>
                <View style={styles.button}>
                    <Button title="Locate me" onPress={this.getLocationHandler} />
                </View>
            </>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignContent: "center"
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: "100%",
        height: "100%"
    },
    map: {
        width: "100%",
        height: 250
    },
})

export default PickLocation
