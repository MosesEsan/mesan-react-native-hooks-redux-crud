import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function ListItem ({item, index, navigation, onDelete}){

    const RightActions = ({ progress, dragX, onPress, item}) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <View style={styles.buttons}>
                <RectButton onPress={() =>  navigation.navigate('NewQuote', {quote: item, title:"Edit Quote"})}>
                    <View style={[styles.rightAction, styles.editAction]}>
                        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
                            Edit
                        </Animated.Text>
                    </View>
                </RectButton>
                <RectButton onPress={() => onDelete(item.id)}>
                    <View style={[styles.rightAction, styles.deleteAction]}>
                        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
                            Delete
                        </Animated.Text>
                    </View>
                </RectButton>
            </View>
        );
    };

    return (
        <Swipeable
            renderRightActions={(progress, dragX) => (
                <RightActions progress={progress} dragX={dragX} item={item}/>
            )}>
            <View style={styles.row}>
                <Text style={styles.quote}>
                    {item.text}
                </Text>
                <Text style={styles.author}>
                    {item.author}
                </Text>
            </View>
        </Swipeable>
    )
};

const styles = StyleSheet.create({
    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        backgroundColor: '#FFF',
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

    buttons:{
        width: 190,
        flexDirection: 'row'
    },

    rightAction: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: 95,
    },

    editAction: {
        backgroundColor: '#497AFC'
    },

    deleteAction: {
        backgroundColor: '#dd2c00'
    },

    actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 20,
    }
});