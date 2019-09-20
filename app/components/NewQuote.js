import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions, Text, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';

import {useDispatch} from 'react-redux';
import axios from "axios";

import {addQuote, updateQuote} from "../actions";

const {width: windowWidth} = Dimensions.get('window');

export default function NewQuote(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    let quote = navigation.getParam('quote');

    //1 - DECLARE VARIABLES
    const [isSaving, setIsSaving] = useState(false);
    const [author, setAuthor] = useState(quote ? quote.author : "");
    const [text, setText] = useState(quote ? quote.text : "");

    //==================================================================================================

    //2 - GET FLATLIST DATA
    const onSave = () => {

        let quote_ = {};

        if (quote){
            quote_ = quote;
            quote_['author'] = author;
            quote_['text'] = text;
        }else{
            let id = generateID();
            quote_ = {"id": id, "author": author, "text": text};
        }

        let url = "https://my-json-server.typicode.com/mesandigital/demo/quotes";
        axios.post(url, quote_)
            .then(res => res.data)
            .then((data) => {
                dispatch(quote ? updateQuote(data) : addQuote(data));
                navigation.goBack();
            })
            .catch(error => {

                console.log(error)
                alert(error.message)
            })
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
    let disabled = (author.length > 0 && text.length > 0) ? false : true;
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
                            onChangeText={(text) => setText(text)}
                            placeholder={"Enter Quote"}
                            style={[styles.text]}
                            value={text}
                        />
                        <TouchableHighlight style={[styles.button]} disabled={disabled} onPress={onSave} underlayColor="rgba(0, 0, 0, 0)" >
                            <Text style={[styles.buttonText, {color: disabled ?  "rgba(255,255,255,.5)" : "#FFF"}]}>
                                Save
                            </Text>
                        </TouchableHighlight>
                    </View>
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
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    inputContainer:{
        flex:1, borderWidth:1
    },

    button:{
        width: windowWidth,
        height: 60,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:"#6B9EFA", borderWidth:1
    },

    buttonText:{
        fontWeight: "500",
        fontSize: 18,
    },

    author: {
        fontWeight: "400",
        lineHeight: 22,
        fontSize: 16,
        fontFamily: 'Helvetica Neue',
        height:80,
        padding: 16, borderWidth:1
    },

    text: {
        fontSize: 17,
        lineHeight: 38,
        fontFamily: 'Helvetica Neue',
        color: "#333333",
        padding: 16,
        paddingTop: 16,
        minHeight: 200,
        borderTopWidth: 1,
        // borderColor: "rgba(212,211,211, 0.3)",
        borderWidth:1
    }
});