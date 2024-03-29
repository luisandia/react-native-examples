import React from 'react'
import { Modal, View, Image, Text, Button, StyleSheet } from 'react-native';
const PlaceDetail = (props) => {
    console.log("PROPS PARA EL MODAL")
    console.log(props)
    console.log(props.selectedPlace !== null)
    let modalContent = null;
    if (props.selectedPlace) {
        modalContent = (
            <View>
                <Image source={props.selectedPlace.image} style={styles.placeImage} />
                <Text style={styles.placeName}> {props.selectedPlace.value}</Text>
            </View>
        )
    }
    return (
        <Modal onRequestClose={props.onModalClosed} visible={props.selectedPlace !== null} animationType="slide">
            <View style={styles.modalContainer}>
                {modalContent}
                <View>
                    <Button title="Deleted" color="red" onPress={props.onItemDeleted} />
                    <Button title="Close" onPress={props.onModalClosed} />
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalContainer: {
        marginTop: 22
    },
    placeImage: {
        width: "100%",
        height: 200
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    }
})

export default PlaceDetail
