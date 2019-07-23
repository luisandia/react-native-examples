import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';
import PlaceDetail from '../PlaceDetail/PlaceDetail';
import { addPlace, deletePlace, selectPlace, deselectPlace } from '../../store/actions/index';


export class FindPlace extends Component {
    static navigationOptions = {
        title: 'Find List',
    };
    
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

    render() {
        console.log("mis props findplace render")
        console.log(this.props)
        return (
            <View>
                {/* <PlaceDetail
                    selectedPlace={this.props.selectedPlace}
                    onItemDeleted={this.placeDeleteHandler}
                    onModalClosed={this.modalCloseHandler} /> */}

                <PlaceList places={this.props.places}
                    onItemSelected={this.placeSelectedHandler}

                />
            </View>
        )
    }
}


const mapStateToProps = (state,props) => {
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
