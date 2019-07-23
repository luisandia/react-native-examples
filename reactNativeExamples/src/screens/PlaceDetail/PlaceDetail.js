import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { deletePlace } from '../../store/actions';

class PlaceDetail extends React.Component {


    placeDeletedhandler = () => {
        console.log("borrando")
        const { selectedPlace } = this.props.navigation.state.params;
        this.props.onDeletePlace(selectedPlace.key);
        this.props.navigation.pop();
    }
    render() {
        props = this.props.navigation.state.params
        console.log("PROPS PARA EL PLACEDETAIL")
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
            // <Modal onRequestClose={props.onModalClosed} visible={props.selectedPlace !== null} animationType="slide">
            <View style={styles.container}>
                {modalContent}
                <View>
                    {/* <Button title="Deleted" color="red" onPress={props.onItemDeleted} /> */}
                    <TouchableOpacity onPress={this.placeDeletedhandler} >
                        <View style={styles.deleteButton}>
                            <Icon size={30} name="ios-trash" color="red" />
                        </View>
                    </TouchableOpacity>
                    {/* <Button title="Close" onPress={this.placeDeletedhandler} /> */}
                </View>
            </View>
            // </Modal>
        )
    }
};

const styles = StyleSheet.create({
    container: {
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
    },
    deleteButton: {
        alignItems: "center"
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    }
}

export default connect(null, mapDispatchToProps)(PlaceDetail)
