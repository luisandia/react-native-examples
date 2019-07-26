import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';
import PlaceDetail from '../PlaceDetail/PlaceDetail';
import { addPlace, deletePlace, selectPlace, deselectPlace } from '../../store/actions/index';


export class FindPlace extends Component {
    static navigationOptions = {
        title: 'Find List',
    };

    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0)
    }

    placeSelectedHandler = (key) => {
        // this.setState(prevState => (
        //   { selectedPlace: prevState.places.find(place => place.key === key) }
        // ))
        console.log("EJECUTANADO SELECTED HANDLER")
        this.props.onSelectPlace(key);
        // this.props.navigation.navigate('PlaceDetail');
        console.log("IMPRIMIENDO PROPS SELECTED HANDLER")
        console.log(this.props)
        // console.log(this.props.selectedPlace)
        const selectedPlace = this.props.places.find(place => place.key === key)
        this.props.navigation.navigate('PlaceDetail', {
            selectedPlace
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        console.log("jcomponente WILLUPDATE")
        console.log(this.prevProps)
        console.log(this.prevState)
        console.log(this.snapshot)
    }
    modalCloseHandler = () => {
        // this.setState({
        //   selectedPlace: null
        // })
        this.props.onDeselectPlace();
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

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            })
        })

        this.placesLoadedHandler();
    }
    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    render() {
        console.log("mis props findplace render")
        console.log(this.props)

        let content = (
            <Animated.View style={
                {
                    opacity: this.state.removeAnim,
                    transform: [
                        {
                            scale: this.state.removeAnim.interpolate({ inputRange: [0, 1], outputRange: [12, 1] })
                        }
                    ]
                }}>
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );

        if (this.state.placesLoaded) {
            content = (
                <Animated.View style={{
                    opacity: this.state.placesAnim
                }}>
                    <PlaceList places={this.props.places}
                        onItemSelected={this.placeSelectedHandler}
                    />
                </Animated.View>
            )
        }

        return (
            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                {/* <PlaceDetail
                    selectedPlace={this.props.selectedPlace}
                    onItemDeleted={this.placeDeleteHandler}
                    onModalClosed={this.modalCloseHandler} /> */}
                {content}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    searchButton: {
        borderColor: "orange",
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: "orange",
        fontWeight: "bold",
        fontSize: 26
    }
})


const mapStateToProps = (state, props) => {
    console.log("actualizacion!!!FINDPLACES")
    console.log(state.places)
    // if(state.places.selectPlace!=null)
    // props.navigation.navigate('PlaceDetail', {
    //     selectPlace: state.places.selectPlace
    // });
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

export default connect(mapStateToProps, mapDispatchToProps)(FindPlace)
