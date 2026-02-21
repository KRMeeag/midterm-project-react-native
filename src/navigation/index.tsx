import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
import BookmarkScreen from '../screens/BookmarkScreen'; // Import new screen

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ headerShown: false}} 
            />
            <Stack.Screen 
              name="Bookmarks" 
              component={BookmarkScreen} 
              options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;