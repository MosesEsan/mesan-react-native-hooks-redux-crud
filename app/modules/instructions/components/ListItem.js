import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ListItem ({item, index}){
    return (
        <View style={styles.row}>
            <Text style={styles.title}>
                {(parseInt(index) + 1)}{". "}{item.title}
            </Text>
            <Text style={styles.description}>
                {item.description}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },

    title:{
        fontSize: 15,
        fontWeight: "600"
    },

    description:{
        marginTop: 5,
        fontSize: 14,
    }
});