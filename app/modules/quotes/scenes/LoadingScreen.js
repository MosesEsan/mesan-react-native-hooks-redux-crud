import React, {useEffect} from 'react';
import {AsyncStorage, View, ActivityIndicator, StyleSheet} from 'react-native';

import SampleData from '../sample'

//1 - LOADING SCREEN
export default function LoadingScreen(props) {

    useEffect(() => checkLocalData(), []);

    function checkLocalData(){
        //Check if LocalStorage has been populated with the sample data
        AsyncStorage.getItem('quotes', (err, data) => {
            //if it doesn't exist, extract from json fil
            if (data === null){
                AsyncStorage.setItem('quotes', JSON.stringify(SampleData.quotes));//save the initial data in Async

                props.navigation.navigate('App'); //Navigate to the home page
            }else{
                props.navigation.navigate('App'); //Navigate to the home page
            }
        });
    }

    return (
        <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator animating={true}/>
        </View>
    );
}

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
});

