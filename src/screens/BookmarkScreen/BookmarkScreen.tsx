import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useJob } from "../../contexts/JobContext";
import { useTheme } from "../../contexts/ThemeContext";
import { JobCard } from "../../components/JobCard/JobCard";
import { BottomNav } from "../../components/BottomNav/BottomNav";
import { MaterialIcons } from "@expo/vector-icons";
import { bookmarkScreenStyles } from "./BookmarkScreen.styles";

const BookmarkScreen = () => {
  // Dependencies
  const { bookmarkedEntries, onRemoveBookmarks } = useJob();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = bookmarkScreenStyles;

  // Remove jobs bulk related states
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Remove jobs bulk related functions
  // Show checkboxes
  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedIds(new Set()); 
  };

  // handles selection of jobs via the checkboxes
  const handleSelectJob = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // handles delete confirmation
  const handleConfirmDelete = () => {
    onRemoveBookmarks(Array.from(selectedIds));
    setIsModalVisible(false);
    setIsSelectionMode(false);
    setSelectedIds(new Set());
  };

  // Empty State Component
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons 
        name="bookmark-outline" 
        size={80} 
        color={colors.primary} 
        style={styles.emptyIcon} 
      />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        No Saved Jobs
      </Text>
      <Text style={styles.emptySubtitle}>
        You haven't bookmarked any listings yet. Tap the save button on a job card to keep track of interesting opportunities.
      </Text>
    </View>
  );

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: insets.top, backgroundColor: colors.background }} />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header Area */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Saved Jobs
          </Text>
          {bookmarkedEntries.length > 0 && !isSelectionMode && (
            <TouchableOpacity
              onPress={toggleSelectionMode}
              style={styles.headerAction}
            >
              <MaterialIcons
                name="delete-outline"
                size={24}
                color={colors.accent}
              />
              <Text style={[styles.headerActionText, { color: colors.accent }]}>
                Select
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Action Bar */}
        {isSelectionMode && (
          <View style={[styles.actionBar, { borderBottomColor: colors.border }]}>
            <TouchableOpacity onPress={toggleSelectionMode} style={styles.actionButton}>
              <Text style={[styles.actionText, { color: colors.text }]}>Cancel</Text>
            </TouchableOpacity>

            <Text style={[styles.selectedCount, { color: colors.text }]}>
              {selectedIds.size} Selected
            </Text>

            <TouchableOpacity
              onPress={() => setIsModalVisible(true)}
              disabled={selectedIds.size === 0}
              style={[
                styles.actionButton,
                { opacity: selectedIds.size === 0 ? 0.5 : 1 },
              ]}
            >
              <Text style={[styles.actionText, { color: "#e74c3c", fontWeight: "bold" }]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* List Content */}
        <View style={styles.listContainer}>
          <FlatList
            data={bookmarkedEntries}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <JobCard
                job={item}
                isSelectable={isSelectionMode}
                isSelected={selectedIds.has(item.id)}
                onSelect={handleSelectJob}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            ListEmptyComponent={renderEmptyState} // Integration
          />
        </View>

        <BottomNav activeRoute="Bookmarks" />
      </View>

      <View style={{ height: insets.bottom, backgroundColor: colors.card }} />

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Delete Jobs</Text>
            <Text style={[styles.modalText, { color: colors.text }]}>
              Are you sure you want to remove {selectedIds.size} saved job
              {selectedIds.size !== 1 ? "s" : ""}?
            </Text>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.background }]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#e74c3c" }]}
                onPress={handleConfirmDelete}
              >
                <Text style={[styles.modalButtonText, { color: "#ffffff" }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BookmarkScreen;