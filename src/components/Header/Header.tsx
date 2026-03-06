import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import { useJob } from "../../contexts/JobContext";
import { headerStyles } from "./Header.style";

export const Header = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const { searchQuery, setSearchQuery } = useJob();
  const styles = headerStyles;

  return (
    <View style={[styles.container, { backgroundColor: colors.header }]}>
      <View style={styles.topRow}>
        <Text style={styles.greeting}>Hello, User</Text>
        <Pressable
          onPress={toggleTheme}
          style={({ pressed }) => [
            styles.themeToggle,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <MaterialIcons
            name={theme === "light" ? "dark-mode" : "light-mode"}
            size={24}
            color="#fff"
          />
        </Pressable>
      </View>
      
      {/* Search Function */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchInputContainer,
            { backgroundColor: colors.card },
          ]}
        >
          <MaterialIcons name="search" size={24} color={colors.primary} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Search title, company, or role..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      </View>
    </View>
  );
};
