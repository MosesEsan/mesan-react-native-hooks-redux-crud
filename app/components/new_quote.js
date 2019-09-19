import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";

import { addQuote, updateQuote } from "../actions";

const {width: windowWidth} = Dimensions.get('window');

export default function NewQuote(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    //1 - DECLARE VARIABLES
    const [isSaving, setIsSaving] = useState(false);
    const [author, setAuthor] = useState(props.quote ? props.quote.author : "");
    const [quote, setQuote] = useState(props.quote ? props.quote.quote : "");

    //==================================================================================================

    //2 - GET FLATLIST DATA
    const addNewQuote = () => {
        let quote_ = {};

        if (props.quote){
            quote_ = props.quote;
            quote_['author'] = author;
            quote_['quote'] = quote;
        }else{
            let id = generateID();
            quote_ = {"id": id, "author": author, "quote": quote};
        }

        let url = "https://my-json-server.typicode.com/mesandigital/demo/quotes";
        axios.post(url, quote_)
            .then((res) => {
                dispatch(props.quote ? updateQuote(quote_) : addQuote(quote_));
                navigation.goBack();
            })
            .catch(error => alert(error.message))
    };

    //==================================================================================================

    //3 - GENERATE ID
    const generateID = () => {
        let d = new Date().getTime();
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
        });

        return id;
    }

    //==================================================================================================

    //4 - RENDER
    let disabled = (author.length > 0 && quote.length > 0) ? false : true;
    return (
        <KeyboardAvoidingView behavior="padding" style={[styles.container]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <View style={[styles.wrapper]}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={(text) => setAuthor(text)}
                            placeholder={"Author"}
                            autoFocus={true}
                            style={[styles.author]}
                            value={author}
                        />
                        <TextInput
                            multiline={true}
                            onChangeText={(text) => setQuote(text)}
                            placeholder={"Enter Quote"}
                            style={[styles.quote]}
                            value={quote}
                        />
                    </View>
                    <TouchableHighlight style={[styles.button]} disabled={disabled} onPress={addNewQuote}>
                        <Text style={[styles.buttonText, {color: disabled ?  "rgba(255,255,255,.5)" : "#FFF"}]}>
                            Save
                        </Text>
                    </TouchableHighlight>
                </View>

            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    wrapper: {
        flex:1, backgroundColor: '#F5F5F5'
    },

    inputContainer:{
        flex:1,
        paddingLeft:10,
        paddingRight:10
    },

    button:{
        width: windowWidth,
        height: 44,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:"#6B9EFA"
    },

    buttonText:{
        fontWeight: "500",
    },

    author: {
        fontWeight: "400",
        lineHeight: 22,
        fontSize: 16,
        fontFamily: 'Helvetica Neue',
        height:25+32,
        padding: 16,
        paddingLeft:0
    },

    quote: {
        fontSize: 17,
        lineHeight: 38,
        fontFamily: 'Helvetica Neue',
        color: "#333333",
        padding: 16,
        paddingLeft:0,
        flex:1,
        height: 200,
        marginBottom:50,
        borderTopWidth: 1,
        borderColor: "rgba(212,211,211, 0.3)",
    }
});