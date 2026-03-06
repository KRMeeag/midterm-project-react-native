import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BookmarkScreen from '../screens/BookmarkScreen/BookmarkScreen'; // Import new screen
import JobForm from '../components/JobForm/JobForm';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ headerShown: false, animation: 'none'}} 
            />
            <Stack.Screen 
              name="Bookmarks" 
              component={BookmarkScreen} 
              options={{ headerShown: false, animation: 'none' }} 
            />
            <Stack.Screen 
              name="ApplicationForm"
              component={JobForm} 
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;