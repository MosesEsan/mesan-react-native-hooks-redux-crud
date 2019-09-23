import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoadingScreen from './LoadingScreen'
import HomeScreen from './Home'
import NewQuoteScreen from './NewQuote'

const AppStack = createStackNavigator({
    Home:{
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Home`,
        }),
    },
    NewQuote:{
        screen: NewQuoteScreen,
        navigationOptions: ({ navigation }) => ({
            title: `New Quote`,
        }),
    }
});

const RoutesStack = createSwitchNavigator(
    {
        Loading: LoadingScreen,
        App: AppStack
    },
    {initialRouteName: 'Loading'}
);

const Router = createAppContainer(RoutesStack);

export default Router;
