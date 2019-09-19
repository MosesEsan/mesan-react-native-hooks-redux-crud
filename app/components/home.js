import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator, TouchableHighlight, Platform, ActionSheetIOS, Animated} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import axios from 'axios'; //Only import if using api

import { addQuotes, deleteQuote } from "../actions";

//Buttons for Action Sheet
const BUTTONS = [
    "Edit",
    "Delete",
    'Cancel',
];
const CANCEL_INDEX = 2;

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
            .then((res) => dispatch(addQuotes(res)))
            .catch(error => alert(error.message))
            .finally(() => setIsFetching(false));
    };

    //==================================================================================================

    //4 - RENDER FLATLIST ITEM
    const renderItem = ({item, index}) => {
        return (
            <Swipeable
                renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, item)}>
                <View style={styles.row}>
                    <Text style={styles.quote}>
                        {item.quote}
                    </Text>
                    <Text style={styles.author}>
                        {item.author}
                    </Text>
                </View>
            </Swipeable>
        )
    };

    renderLeftActions = (progress, dragX, quote) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });

        const onPress = () => deleteWithQuoteId(quote.id);
        return (
            <View style={{ width: 192, flexDirection: 'row' }}>
                <RectButton style={styles.leftAction} onPress={onPress}>
                    <Animated.Text
                        style={[
                            styles.actionText,
                            {
                                transform: [{ translateX: trans }],
                            },
                        ]}>
                        Delete
                    </Animated.Text>
                </RectButton>
                {/*{this.renderRightAction('More', '#C8C7CD', 192, progress)}*/}
                {/*{this.renderRightAction('Flag', '#ffab00', 128, progress)}*/}
                {/*{this.renderRightAction('More', '#dd2c00', 64, progress)}*/}
            </View>


        );
    };

    //==================================================================================================

    //5 - SHOW ACTION SHEET
    const showOptions = (quote) => {
        if (Platform.OS === 'ios'){
            ActionSheetIOS.showActionSheetWithOptions({
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: 1,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0){
                        navigation.navigate('NewQuote', {
                            quote: quote,
                            title:"Edit Quote"
                        });
                    }else if (buttonIndex === 1) deleteWithQuoteId(quote.id)
                });
        }
    };

    //==================================================================================================

    //6 - DELETE QUOTE
    const deleteWithQuoteId = (id) => {
        setIsFetching(true);

        let url = "https://my-json-server.typicode.com/mesandigital/demo/quotes";
        axios.delete(url, {id})
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
            <View style={{flex:1, backgroundColor: '#F5F5F5', paddingTop:20}}>
                <FlatList
                    data={quotes}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `quotes_${index}`}/>

                <TouchableHighlight style={styles.floatingButton}
                                    underlayColor='#ff7043' onPress={() => Actions.new_quote()}>
                    <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                </TouchableHighlight>
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

    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },

    author: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8 * 2
    },

    quote: {
        marginTop: 5,
        fontSize: 14,
    },

    leftAction: {
        flex: 1,
        backgroundColor: '#497AFC',
        justifyContent: 'center',
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
});