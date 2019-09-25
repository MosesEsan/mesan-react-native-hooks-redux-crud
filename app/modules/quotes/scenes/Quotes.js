import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import * as api from "../api";
import {addQuotes, deleteQuote} from "../actions";

import ListItem from "../components/ListItem";

export default function Home(props) {
    const dispatch = useDispatch();
    const {navigation} = props;

    //1 - DECLARE VARIABLES
    const [isFetching, setIsFetching] = useState(false);

    //Access Redux Store State
    const quotesReducer = useSelector((state) => state.quotesReducer);
    const {quotes} = quotesReducer;

    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);

    //==================================================================================================

    //3 - GET FLATLIST DATA
    const getData = () => {
        setIsFetching(true);

        api.getQuotes()
            .then((data) => dispatch(addQuotes(data)))
            .catch(error => alert(error.message))
            .finally(() => setIsFetching(false));
    };

    //==================================================================================================

    //4 - RENDER FLATLIST ITEM
    const renderItem = ({item, index}) => {
        return (
            <ListItem item={item} index={index} navigation={navigation} onDelete={onDelete} onEdit={onEdit}/>
        )
    };

    //==================================================================================================

    //5 - EDIT QUOTE
    const onEdit = (item) => {
        navigation.navigate('NewQuote', {quote: item, title: "Edit Quote"})
    };

    //==================================================================================================

    //6 - DELETE QUOTE
    const onDelete = (id) => {
        api.deleteQuote(id)
            .then((data) => dispatch(deleteQuote(data)))
            .catch(error => alert(error.message))
            .finally(() => setIsFetching(false));
    };

    //==================================================================================================

    //7 - RENDER
    if (isFetching) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator animating={true}/>
            </View>
        );
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={quotes}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `quotes_${index}`}/>

                <TouchableHighlight style={styles.floatingButton}
                                    underlayColor='#ff7043'
                                    onPress={() => navigation.navigate('NewQuote', {title: "New Quote"})}>
                    <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    floatingButton: {
        backgroundColor: '#6B9EFA',
        borderColor: '#6B9EFA',
        height: 55,
        width: 55,
        borderRadius: 55 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        right: 15,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});