import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons';

import {InstructionStack} from './modules/instructions'
import {LoadingScreen, QuotesStack} from './modules/quotes'

const TabNavigator = createBottomTabNavigator(
    {
        Instructions: InstructionStack,
        Quotes: QuotesStack,
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Instructions') {
                    iconName = `md-list-box`;
                } else if (routeName === 'Quotes') {
                    iconName = `md-quote`;
                }

                return <Ionicons  name={iconName} size={22} color={tintColor}/>
            },

            headerStyle: {
                backgroundColor: '#fff',
                borderBottomWidth: 0
            },

            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 17,
                fontFamily: 'HelveticaNeue-Bold',
                color: '#363434',
            }
        }),

        tabBarOptions: {
            activeTintColor: "#0a163d",
            inactiveTintColor: 'gray',
        },
    });

const RoutesStack = createSwitchNavigator(
    {
        Loading: LoadingScreen,
        App: TabNavigator
    },
    {initialRouteName: 'Loading'}
);

const Router = createAppContainer(RoutesStack);

export default Router;



