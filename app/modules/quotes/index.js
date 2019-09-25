import { createStackNavigator } from 'react-navigation-stack';

import actions from "./actions"
import reducer from "./reducer"

import LoadingScreen from './scenes/LoadingScreen'
import QuotesScreen from './scenes/Quotes'
import NewQuoteScreen from './scenes/NewQuote'

const QuotesStack = createStackNavigator({
    Home:{
        screen: QuotesScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Quotes`,
        }),
    },
    NewQuote:{
        screen: NewQuoteScreen,
        navigationOptions: ({ navigation }) => ({
            title: `New Quote`,
        }),
    }
});


export {actions, reducer, LoadingScreen, QuotesStack}