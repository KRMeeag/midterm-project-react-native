import React from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { confirmationModalStyles } from "./ConfirmationModal.styles";

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export const ConfirmationModal = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Yes",
  cancelText = "No",
  isDestructive = true,
}: ConfirmationModalProps) => {
  const { colors } = useTheme();
  const styles = confirmationModalStyles;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            {title}
          </Text>
          <Text style={[styles.modalText, { color: colors.text }]}>
            {message}
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
              onPress={onClose}
            >
              <Text style={[styles.modalButtonText, { color: colors.text }]}>
                {cancelText}
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.modalButton,
                {
                  backgroundColor: isDestructive ? "#e74c3c" : colors.primary,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              onPress={onConfirm}
            >
              <Text style={[styles.modalButtonText, { color: "#ffffff" }]}>
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
