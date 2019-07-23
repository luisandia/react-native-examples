import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import PlaceList from './src/components/PlaceList/PlaceList';
import placeImage from './src/assets/197830.jpg';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import { connect } from 'react-redux';
import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index';
import configureStore from './src/store/configureStore';

class App extends React.Component {

    state = {
        placeName: ""
    }

    placeNameChangeHandler = val => {
        this.setState({
            placeName: val
        })
    }

    placeSubmitHandler = val => {
        // if (this.state.placeName.trim() === '') {
        //   return;
        // }
        // this.setState(prevState => {
        //   return {
        //     places: [...prevState.places,
        //     {
        //       key: Math.floor(Math.random() * 10000).toString(),
        //       value: prevState.placeName,
        //       image: { uri: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
        //     }]
        //   }
        // })

        this.props.onAddPlace(this.state.placeName);
    }

    placeDeleteHandler = key => {
        // this.setState(prevState => {
        //   console.log(prevState.places)
        //   return {
        //     places: prevState.places.filter((place) => {
        //       return place.key !== prevState.selectedPlace.key;
        //     }),
        //     selectedPlace: null
        //   }
        // })
        this.props.onDeletePlace();
    }

    placeSelectedHandler = (key) => {
        // this.setState(prevState => (
        //   { selectedPlace: prevState.places.find(place => place.key === key) }
        // ))
        console.log("EJECUTANADO SELECTED HANDLER")
        this.props.onSelectPlace(key);
    }

    modalCloseHandler = () => {
        // this.setState({
        //   selectedPlace: null
        // })
        this.props.onDeselectPlace();
    }

    render() {
        console.log(this.props)
        const placesOutput = <PlaceList places={this.props.places}
            onItemSelected={this.placeSelectedHandler}
        />
        return (
            <View style={styles.container}>
                <PlaceDetail
                    selectedPlace={this.props.selectedPlace}
                    onItemDeleted={this.placeDeleteHandler}
                    onModalClosed={this.modalCloseHandler} />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.placeInput}
                        placeholder="Put your text"
                        value={this.state.placeName} onChangeText={this.placeNameChangeHandler} />
                    <Button title="Add" style={styles.placeButton} onPress={this.placeSubmitHandler} />
                </View>
                <View style={styles.listContainer}>
                    {placesOutput}
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 26,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    inputContainer: {
        // flex: 1,
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
    listContainer: {
        width: "100%"
    }

});

const mapStateToProps = state => {
    return {
        ...state.places
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName)),
        onDeletePlace: () => dispatch(deletePlace()),
        onSelectPlace: (key) => dispatch(selectPlace(key)),
        onDeselectPlace: () => dispatch(deselectPlace())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)