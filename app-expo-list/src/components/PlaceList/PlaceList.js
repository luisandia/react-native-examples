import React from 'react';
import { FlatList } from 'react-native';
import ListItem from '../ListItem/ListItem';

const placeList = (props) => {

    return (
        <FlatList
            data={props.places}
            renderItem={({ item: { value, key, image } }) =>
                <ListItem onItemPressed={() => props.onItemSelected(key)} placeName={value} placeImage={image} />}>
        </FlatList>
    )
};

export default placeList;