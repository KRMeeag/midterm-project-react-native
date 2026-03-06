import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons"; // Added Feather for subtle info icons
import { useTheme } from "../../contexts/ThemeContext";
import { JobsProcessed } from "../../types";
import { useJob } from "../../contexts/JobContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { jobCardStyles } from "./JobCard.styles";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface JobCardProps {
  job: JobsProcessed;
  onBookmarkToggle?: (isSaved: boolean) => void;
  onApplicationToggle?: (isApplied: boolean) => void;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export const JobCard = ({
  job,
  onBookmarkToggle,
  onApplicationToggle,
  isSelectable,
  isSelected,
  onSelect,
}: JobCardProps) => {
  // Dependencies
  const { colors } = useTheme();
  const { onBookmarksPress, onApplication } = useJob();
  const navigation = useNavigation<NavigationProp>();
  const styles = jobCardStyles;

  // Modal States
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isUnsaveModalVisible, setIsUnsaveModalVisible] = useState(false);

  // Safe Returns
  // Default to Initial Letter as Logo Photo
  const logoInitial = job.companyName
    ? job.companyName.charAt(0).toUpperCase()
    : "?";
  const displayTags = [job.jobType, job.workModel, job.seniorityLevel].filter(
    Boolean,
  );

  // Format Salary depending on JSON
  const formatSalary = () => {
    if (job.minSalary && job.maxSalary)
      return `${job.minSalary} - ${job.maxSalary} ${job.currency}`;
    if (job.minSalary) return `${job.minSalary}+ ${job.currency}`;
    return "Undisclosed Salary";
  };

  // Format Dates
  const formatPubDate = () => {
    if (!job.pubDate) return "Unknown date";

    // Multiply by 1000 to convert seconds to milliseconds
    const date = new Date(job.pubDate * 1000);

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Modal related functions
  // Handles saving via modal
  const handleSavePress = () => {
    if (job.isSaved) {
      setIsUnsaveModalVisible(true);
    } else {
      onBookmarksPress(job.id);
      if (onBookmarkToggle) onBookmarkToggle(true);
    }
  };

  // Unsaves job
  const handleConfirmUnsave = () => {
    onBookmarksPress(job.id);
    if (onBookmarkToggle) onBookmarkToggle(false);
    setIsUnsaveModalVisible(false);
  };

  // Unapplies to job
  const handleCancelApplicationConfirm = () => {
    onApplication(job.id);
    setIsCancelModalVisible(false);
    if (onApplicationToggle) onApplicationToggle(false);
  };

  const CardWrapper = isSelectable ? Pressable : View;

  return (
    <>
      <CardWrapper
        onPress={() => {
          if (isSelectable && onSelect) onSelect(job.id);
        }}
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: isSelected ? colors.primary : colors.border,
          },
        ]}
      >
        {/* Header Row */}
        <View style={styles.headerRow}>
          {isSelectable && (
            <View style={styles.checkboxContainer}>
              <MaterialIcons
                name={isSelected ? "check-box" : "check-box-outline-blank"}
                size={24}
                color={isSelected ? colors.primary : "#888"}
              />
            </View>
          )}
          <View style={styles.logoTitleContainer}>
            {job.companyLogo ? (
              <Image source={{ uri: job.companyLogo }} style={styles.logo} />
            ) : (
              <View style={[styles.logo, { backgroundColor: colors.primary }]}>
                <Text style={styles.logoText}>{logoInitial}</Text>
              </View>
            )}

            <View style={styles.textContainer}>
              <Text
                style={[styles.title, { color: colors.text }]}
                numberOfLines={2}
              >
                {job.title}
              </Text>
              <Text
                style={[styles.company, { color: colors.subtext }]}
                numberOfLines={1}
              >
                {job.companyName}
              </Text>
            </View>
          </View>
        </View>

        {/* New Summarized Info Section */}
        <View style={styles.infoSection}>
          {job.locations && job.locations.length > 0 && (
            <View style={styles.infoRow}>
              <Feather name="map-pin" size={14} color={colors.subtext} />
              <Text
                style={[styles.infoText, { color: colors.subtext }]}
                numberOfLines={1}
              >
                {job.locations.join(", ")}
              </Text>
            </View>
          )}
          {job.pubDate && (
            <View style={styles.infoRow}>
              <Feather name="clock" size={14} color={colors.subtext} />
              <Text style={[styles.infoText, { color: colors.subtext }]}>
                Posted {formatPubDate()}
              </Text>
            </View>
          )}
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {displayTags.map((tag, index) => (
            <View
              key={index}
              style={[styles.tag, { backgroundColor: colors.background }]}
            >
              <Text style={[styles.tagText, { color: colors.text }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>

        {/* Salary */}
        <Text style={[styles.price, { color: colors.text }]}>
          {formatSalary()}
        </Text>

        {/* Actions */}
        {!isSelectable && (
          <View style={styles.footerRow}>
            <Pressable
              onPress={handleSavePress}
              style={({ pressed }) => [
                styles.actionButton,
                styles.saveButton,
                {
                  backgroundColor: job.isSaved
                    ? "transparent"
                    : colors.secondary,
                  borderColor: job.isSaved ? colors.border : "transparent",
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  { color: job.isSaved ? colors.primary : "#fff" },
                ]}
              >
                {job.isSaved ? "Saved" : "Save Job"}
              </Text>
            </Pressable>

            {job.isApplied ? (
              <Pressable
                onPress={() => setIsCancelModalVisible(true)}
                style={({ pressed }) => [
                  styles.actionButton,
                  styles.applyButton,
                  {
                    backgroundColor: "transparent",
                    borderWidth: 1,
                    borderColor: "#e74c3c",
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text style={[styles.actionButtonText, { color: "#e74c3c" }]}>
                  Cancel Apply
                </Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => navigation.navigate("ApplicationForm", { job })}
                style={({ pressed }) => [
                  styles.actionButton,
                  styles.applyButton,
                  {
                    backgroundColor: colors.accent,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text style={[styles.actionButtonText, { color: "#fff" }]}>
                  Apply
                </Text>
              </Pressable>
            )}
          </View>
        )}
      </CardWrapper>

      {/* Refactored Modals */}
      <ConfirmationModal
        visible={isUnsaveModalVisible}
        onClose={() => setIsUnsaveModalVisible(false)}
        onConfirm={handleConfirmUnsave}
        title="Unsave Job"
        message="Are you sure you want to remove this job from your saved list?"
        confirmText="Unsave"
        cancelText="Cancel"
      />

      <ConfirmationModal
        visible={isCancelModalVisible}
        onClose={() => setIsCancelModalVisible(false)}
        onConfirm={handleCancelApplicationConfirm}
        title="Cancel Application"
        message={`Are you sure you want to revoke your application for ${job.companyName}?`}
      />
    </>
  );
};
