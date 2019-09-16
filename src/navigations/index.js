import react from 'react'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

const AuthStack = createStackNavigator({ 
  Login: LoginScreen 
});
const AppStack = createStackNavigator({ 
  Home: HomeScreen, 
  Chat: ChatScreen, 
  Profile: ProfileScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
