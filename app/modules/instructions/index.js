import { createStackNavigator } from 'react-navigation-stack';

import actions from "./actions"
import reducer from "./reducer"

import HomeScreen from './scenes/Home'

const InstructionStack = createStackNavigator({
    Home:{
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Instructions`,
        }),
    }
});


export {actions, reducer, InstructionStack}