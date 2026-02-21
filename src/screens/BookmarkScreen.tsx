import React from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, StatusBar } from "react-native";
import { useJob } from "../contexts/JobContext";
import { useTheme } from "../contexts/ThemeContext"; 
import { JobCard } from "../components/JobCard";     
import { BottomNav } from "../components/BottomNav"; 

const BookmarkScreen = () => {
  const { bookmarkedEntries } = useJob();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" />
      
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Bookmark</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={bookmarkedEntries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <JobCard job={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No bookmarked jobs yet.
            </Text>
          }
        />
      </View>

      <BottomNav activeRoute="Bookmarks" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent', // Change if border is desired
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
});

export default BookmarkScreen;