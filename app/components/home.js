import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, Text, ActivityIndicator, TouchableHighlight} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import { addQuotes, deleteQuote } from "../actions";

import ListItem from "./ListItem";

export default function Home(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    //1 - DECLARE VARIABLES
    const [isFetching, setIsFetching] = useState(false);

    //Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducer);
    const { quotes } = dataReducer;

    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);

    //==================================================================================================

    //3 - GET FLATLIST DATA
    const getData = () => {
        setIsFetching(true);

        let url = "https://my-json-server.typicode.com/mesandigital/demo/quotes";
        axios.get(url)
            .then(res => res.data)
            .then((data) => dispatch(addQuotes(data)))
            .catch(error => alert(error.message))
            .finally(() => setIsFetching(false));
    };

    //==================================================================================================

    //4 - RENDER FLATLIST ITEM
    const renderItem = ({item, index}) => {
        return (
            <ListItem item={item} index={index} navigation={navigation} onDelete={onDelete}/>
        )
    };

    //==================================================================================================

    //6 - DELETE QUOTE
    const onDelete = (id) => {
        let url = "https://my-json-server.typicode.com/mesandigital/demo/quotes";
        axios.delete(url, {data:{id:id}})
            .then((res) => {

                alert("back");
                console.log(res)
                dispatch(deleteQuote(id))
            })
            .catch(error => alert(error.message))
            .finally(() => setIsFetching(false));
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
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={quotes}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `quotes_${index}`}/>

                <TouchableHighlight style={styles.floatingButton}
                                    underlayColor='#ff7043'
                                    onPress={() => navigation.navigate('NewQuote', {title:"New Quote"})}>
                    <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    floatingButton:{
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
});