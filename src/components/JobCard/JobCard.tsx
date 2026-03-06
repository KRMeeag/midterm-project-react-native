import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Modal, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import { JobsProcessed } from "../../types";
import { useJob } from "../../contexts/JobContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { jobCardStyles } from "./JobCard.styles";

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

  // Modal related functions
  // Handles saving via modal
  const handleSavePress = () => {
    if (job.isSaved) {
      // If currently saved, show confirmation modal before unsaving
      setIsUnsaveModalVisible(true);
    } else {
      // If not saved, proceed with saving immediately
      onBookmarksPress(job.id);
      if (onBookmarkToggle) {
        onBookmarkToggle(true);
      }
    }
  };

  // Unsaves job
  const handleConfirmUnsave = () => {
    onBookmarksPress(job.id);
    if (onBookmarkToggle) {
      onBookmarkToggle(false);
    }
    setIsUnsaveModalVisible(false);
  };

  // Unapplies to job
  const handleCancelApplicationConfirm = () => {
    onApplication(job.id);
    setIsCancelModalVisible(false);
    if (onApplicationToggle) {
      onApplicationToggle(false);
    }
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
                ellipsizeMode="tail"
              >
                {job.title}
              </Text>
              <Text
                style={[styles.company, { color: colors.subtext }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {job.companyName}
              </Text>
            </View>
          </View>
        </View>

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

        <Text style={[styles.price, { color: colors.text }]}>
          {formatSalary()}
        </Text>

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

      {/* Unsave Confirmation Modal */}
      <Modal
        transparent={true}
        visible={isUnsaveModalVisible}
        animationType="fade"
        onRequestClose={() => setIsUnsaveModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Unsave Job
            </Text>
            <Text style={[styles.modalText, { color: colors.text }]}>
              Are you sure you want to remove this job from your saved list?
            </Text>

            <View style={styles.modalButtonRow}>
              <Pressable
                style={({ pressed }) => [
                  styles.modalButton,
                  {
                    backgroundColor: colors.background,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
                onPress={() => setIsUnsaveModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: colors.text }]}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.modalButton,
                  {
                    backgroundColor: "#e74c3c",
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
                onPress={handleConfirmUnsave}
              >
                <Text style={[styles.modalButtonText, { color: "#ffffff" }]}>
                  Unsave
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Cancel Application Confirmation Modal */}
      <Modal
        transparent={true}
        visible={isCancelModalVisible}
        animationType="fade"
        onRequestClose={() => setIsCancelModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Cancel Application
            </Text>
            <Text style={[styles.modalText, { color: colors.text }]}>
              Are you sure you want to revoke your application for{" "}
              {job.companyName}?
            </Text>

            <View style={styles.modalButtonRow}>
              <Pressable
                style={({ pressed }) => [
                  styles.modalButton,
                  {
                    backgroundColor: colors.background,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
                onPress={() => setIsCancelModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: colors.text }]}>
                  No
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.modalButton,
                  {
                    backgroundColor: "#e74c3c",
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
                onPress={handleCancelApplicationConfirm}
              >
                <Text style={[styles.modalButtonText, { color: "#ffffff" }]}>
                  Yes
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
