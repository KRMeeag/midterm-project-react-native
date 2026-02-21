import React from "react";
import { StatusBar, StyleSheet, Text, View, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useJob } from "../contexts/JobContext";
import { useTheme } from "../contexts/ThemeContext";
import { Header } from "../components/Header";
import { JobCard } from "../components/JobCard";
import { BottomNav } from "../components/BottomNav";
import { JobsProcessed } from "../types";

const MOCK_JOBS: JobsProcessed[] = [
  {
    id: '1',
    guid: 'guid-1',
    title: 'React Developer',
    mainCategory: 'Engineering',
    companyName: 'AmplifyAvenue',
    companyLogo: '',
    jobType: 'Full-Time',
    workModel: 'Remote',
    seniorityLevel: 'Mid-Senior Level',
    minSalary: 62000,
    maxSalary: 82000,
    currency: 'USD',
    locations: ['Remote'],
    tags: ['React', 'TypeScript'],
    description: '<p>Standard mock description</p>',
    pubDate: Date.now(),
    expiryDate: Date.now() + 86400000,
    applicationLink: 'https://example.com',
    isSaved: true,
  },
  {
    id: '2',
    guid: 'guid-2',
    title: 'Accountant',
    mainCategory: 'Finance',
    companyName: 'QubitLink Software',
    companyLogo: '',
    jobType: 'Contract',
    workModel: 'On-Site',
    seniorityLevel: 'Associate',
    minSalary: null,
    maxSalary: null,
    currency: 'USD',
    locations: ['New York'],
    tags: ['Excel', 'QuickBooks'],
    description: '<p>Standard mock description</p>',
    pubDate: Date.now(),
    expiryDate: Date.now() + 86400000,
    applicationLink: 'https://example.com',
    isSaved: false,
  }
];

const HomeScreen = () => {
  const { data, loading } = useJob();
  const { colors, theme } = useTheme();
  const insets = useSafeAreaInsets();

  if (loading) {
    return null;
  }

  const jobsToDisplay = data && data.length > 0 ? data : MOCK_JOBS;

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="light-content" />
      
      {/* Top Safe Area Filler */}
      <View style={{ height: insets.top, backgroundColor: colors.header }} />

      {/* Main Content Area */}
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header />
        
        <View style={styles.listContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Suggested Jobs</Text>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See all</Text>
          </View>

          <FlatList
            data={jobsToDisplay}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <JobCard job={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </View>

        <BottomNav activeRoute="Home" />
      </View>

      {/* Bottom Safe Area Filler */}
      <View style={{ height: insets.bottom, backgroundColor: colors.card }} />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default HomeScreen;