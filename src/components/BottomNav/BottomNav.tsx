import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, BottomNavProps } from '../../types';
import { bottomNavStyles } from './BottomNav.styles';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const BottomNav = ({ activeRoute }: BottomNavProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const styles = bottomNavStyles;

  const navigateTo = (location: string) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: location }]
      })
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
      <Pressable 
        style={({ pressed }) => [
          styles.navItem, 
          { opacity: pressed ? 0.7 : 1 }
        ]} 
        onPress={() => navigateTo("Home")}
      >
        <MaterialIcons 
          name="home" 
          size={28} 
          color={activeRoute === 'Home' ? colors.primary : '#888'} 
        />
      </Pressable>
      
      <Pressable 
        style={({ pressed }) => [
          styles.navItem, 
          { opacity: pressed ? 0.7 : 1 }
        ]} 
        onPress={() => navigateTo("Bookmarks")}
      >
        <MaterialIcons 
          name="bookmark" 
          size={28} 
          color={activeRoute === 'Bookmarks' ? colors.primary : '#888'} 
        />
      </Pressable>
    </View>
  );
};

