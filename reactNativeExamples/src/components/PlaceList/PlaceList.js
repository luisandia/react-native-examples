import React from 'react';
import { FlatList } from 'react-native';
import ListItem from '../ListItem/ListItem';





class placeList extends React.Component {

    _renderItem = ({ item }) => {
        console.log(item)
        return <ListItem onItemPressed={() => props.onItemSelected(key)} placeName={value} placeImage={image} />
    }

    render() {
        console.log("imprimiendo lista placelist")
        console.log(this.props)


        return (
            <FlatList
            data={this.props.places}
            renderItem={({ item: { name, key, image } }) =>{
                return <ListItem onItemPressed={() => this.props.onItemSelected(key)} placeName={name} placeImage={image} />}
            }
            >
        </FlatList>
    )
    }
};

export default placeList;