import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

export const Header = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.header }]}>
      <View style={styles.topRow}>
        <Text style={styles.greeting}>Hello, User</Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <MaterialIcons 
            name={theme === 'light' ? 'dark-mode' : 'light-mode'} 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: colors.card }]}>
          <MaterialIcons name="search" size={24} color={colors.primary} />
          <TextInput 
            style={[styles.input, { color: colors.text }]} 
            placeholder="Search" 
            placeholderTextColor="#888"
          />
        </View>
        {/* <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.warning }]}>
          <MaterialIcons name="tune" size={24} color="#264653" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  themeToggle: {
    padding: 8,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 12,
    marginRight: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});