import React, { useEffect, useRef, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useJob } from "../../contexts/JobContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Header } from "../../components/Header/Header";
import { JobCard } from "../../components/JobCard/JobCard";
import { BottomNav } from "../../components/BottomNav/BottomNav";
import { RootStackParamList, JobsProcessed } from "../../types";
import { MaterialIcons } from "@expo/vector-icons"; // Import for the icon
import { homeScreenStyles } from "./HomeScreen.styles";

type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  // Dependencies
  const { data, loading, searchQuery } = useJob();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const route = useRoute<HomeScreenRouteProp>();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Home">>();
  const flatListRef = useRef<FlatList<JobsProcessed>>(null);
  const styles = homeScreenStyles;

  // Derived state filtering
  const filteredJobs = data.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) ||
      job.companyName.toLowerCase().includes(query) ||
      job.workModel.toLowerCase().includes(query) ||
      job.jobType.toLowerCase().includes(query) ||
      job.seniorityLevel.toLowerCase().includes(query) ||
      job.locations.some((loc) => loc.toLowerCase().includes(query))
    );
  });

  // Toast Configuration State
  const [toastConfig, setToastConfig] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Toasts for user interaction confirmation
  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToastConfig({ message, type });

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    timeoutRef.current = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setToastConfig(null);
      });
    }, 3000);
  };

  // Toast for successful job application
  useEffect(() => {
    if (route.params?.appliedJobId) {
      showToast("Application Submitted Successfully", "success");
      navigation.setParams({ appliedJobId: undefined });
    }
  }, [route.params?.appliedJobId]);

  // Reset scroll during search
  useEffect(() => {
    if (filteredJobs.length > 0) {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [searchQuery]);

  // Empty State Component
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons
        name="search-off"
        size={80}
        color={colors.primary}
        style={styles.emptyIcon}
      />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        No Results Found
      </Text>
      <Text style={styles.emptySubtitle}>
        We couldn't find any jobs matching "{searchQuery}". Try adjusting your
        filters or search terms.
      </Text>
    </View>
  );

  if (loading) return null;

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="light-content" />
      <View style={{ height: insets.top, backgroundColor: colors.header }} />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header />
        <View style={styles.listContainer}>
          <FlatList
            ref={flatListRef}
            data={filteredJobs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <JobCard
                job={item}
                onBookmarkToggle={(isSaved) =>
                  showToast(
                    isSaved ? "Job Saved" : "Job Unsaved",
                    isSaved ? "success" : "error",
                  )
                }
                onApplicationToggle={(isApplied) => {
                  if (!isApplied) {
                    showToast("Application Revoked", "error");
                  }
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            ListHeaderComponent={
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Suggested Jobs
                </Text>
              </View>
            }
            ListEmptyComponent={renderEmptyState} // Integration point
          />
        </View>

        <BottomNav activeRoute="Home" />
      </View>

      {/* Dynamic Toast Chip */}
      {toastConfig && (
        <Animated.View
          style={[
            styles.chipContainer,
            {
              backgroundColor:
                toastConfig.type === "error" ? "#e74c3c" : colors.primary,
              bottom: insets.bottom + 80,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.chipText}>{toastConfig.message}</Text>
        </Animated.View>
      )}

      <View style={{ height: insets.bottom, backgroundColor: colors.card }} />
    </View>
  );
};

export default HomeScreen;
