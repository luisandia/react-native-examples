import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace, deletePlace, selectPlace, deselectPlace } from '../../store/actions/index';



class SharePlace extends Component {
    render() {
        return (
            <View>
                <PlaceInput onAddPlace={this.props.onAddPlace} />
            </View>
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

export default connect(null, mapDispatchToProps)(SharePlace);
