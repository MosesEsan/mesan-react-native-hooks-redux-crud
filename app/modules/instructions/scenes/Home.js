import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import {getInstructions} from "../api";
import {addData} from "../actions";

import ListItem from "../components/ListItem";

export default function Home(props) {
    const dispatch = useDispatch();

    //1 - DECLARE VARIABLES
    const [isFetching, setIsFetching] = useState(false);

    //Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducer);
    const { data } = dataReducer;

    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);

    //==================================================================================================

    //3 - GET FLATLIST DATA
    const getData = () => {
        setIsFetching(true);

        getInstructions()
            .then(res => res.data)
            .then((data) => dispatch(addData(data)))
            .catch(error => alert(error.message))
            .finally(() => setIsFetching(false));
    };

    //==================================================================================================

    //4 - RENDER FLATLIST ITEM
    const renderItem = ({item, index}) => {
        return (
            <ListItem item={item} index={index}/>
        )
    };

    //==================================================================================================

    //5 - RENDER
    if (isFetching) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator animating={true}/>
            </View>
        );
    } else{
        return (
            <View style={{flex:1, backgroundColor: '#F5F5F5', paddingTop:20}}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `flat_${index}`}/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
});