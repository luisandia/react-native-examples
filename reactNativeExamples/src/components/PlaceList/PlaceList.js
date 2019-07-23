import React from 'react';
import { FlatList } from 'react-native';
import ListItem from '../ListItem/ListItem';

const placeList = (props) => {
    console.log("imprimiendo lista placelist")
    console.log(props)
    return (
        <FlatList
            data={props.places}
            renderItem={({ item: { value, key, image } }) =>
                <ListItem onItemPressed={() => props.onItemSelected(key)} placeName={value} placeImage={image} />}>
        </FlatList>
    )
};

export default placeList;