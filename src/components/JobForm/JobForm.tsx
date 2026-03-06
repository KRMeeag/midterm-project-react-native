import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Modal,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "../../contexts/ThemeContext";
import { RootStackParamList, FormValues } from "../../types";
import { useJob } from "../../contexts/JobContext";
import { jobFormStyles } from "./JobForm.styles";
import { validationSchema } from "../../utils/validationSchemas";

type JobFormRouteProp = RouteProp<RootStackParamList, "ApplicationForm">;
type NavigationProp = StackNavigationProp<RootStackParamList>;

const JobForm: React.FC = () => {
  // Dependencies
  const route = useRoute<JobFormRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { job } = route.params;
  const { colors, theme } = useTheme();
  const { onApplication } = useJob();
  const styles = jobFormStyles;

  // References for targeted scolls
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const wswhyInputRef = useRef<TextInput>(null);

  // Modal states
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  // Modal related functions
  // Show modal to ask confirmation of submission
  const handleConfirmSubmit = () => {
    setModalVisible(false);
    onApplication(job.id);
    setIsSuccessModalVisible(true);
  };

  // Shows confirmation of submission and redirection
  const handleSuccessClose = () => {
    setIsSuccessModalVisible(false);
    navigation.navigate("Home", { appliedJobId: job.id });
  };

  // Closes modal without confirming submission
  const handleCancelSubmit = () => {
    setModalVisible(false);
  };

  // Header Style
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Application Form",
      headerStyle: {
        backgroundColor: colors.header,
        // Increase this value to your preferred height
        height: 110,
      },
      headerTintColor: "#fff",
      // Ensures title stays centered if the header is much taller
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 22,
      },
    });
  }, [navigation, colors]);

  // 1. Removed TouchableWithoutFeedback
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={10}
        enableResetScrollToCoords={false}
        enableAutomaticScroll={true}
      >
        {/* Job Context Header */}
        <View style={styles.headerContainer}>
          <Text style={[styles.jobTitle, { color: colors.text }]}>
            {job.title}
          </Text>
          <Text style={[styles.companyName, { color: colors.primary }]}>
            {job.companyName}
          </Text>

          <View style={styles.badgeRow}>
            {job.locations?.[0] && (
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text style={[styles.badgeText, { color: colors.text }]}>
                  {job.locations[0]}
                </Text>
              </View>
            )}
            {job.jobType && (
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text style={[styles.badgeText, { color: colors.text }]}>
                  {job.jobType}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Application Form */}
        <Formik<FormValues>
          initialValues={{
            name: "",
            email: "",
            contact_number: "",
            wswhy: "",
          }}
          validationSchema={validationSchema}
          onSubmit={() => setModalVisible(true)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              {/* Name Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Full Name
                </Text>
                <TextInput
                  placeholder="e.g. Jane Doe"
                  placeholderTextColor="#888"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.card,
                      color: colors.text,
                      borderColor:
                        touched.name && errors.name ? "#e74c3c" : colors.border,
                    },
                  ]}
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              {/* Email Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Email Address
                </Text>
                <TextInput
                  placeholder="jane.doe@example.com"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.card,
                      color: colors.text,
                      borderColor:
                        touched.email && errors.email
                          ? "#e74c3c"
                          : colors.border,
                    },
                  ]}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Contact Number Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Phone Number
                </Text>
                <TextInput
                  placeholder="e.g. +631234567890"
                  placeholderTextColor="#888"
                  keyboardType="phone-pad"
                  onChangeText={handleChange("contact_number")}
                  onBlur={handleBlur("contact_number")}
                  value={values.contact_number}
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.card,
                      color: colors.text,
                      borderColor:
                        touched.contact_number && errors.contact_number
                          ? "#e74c3c"
                          : colors.border,
                    },
                  ]}
                />
                {touched.contact_number && errors.contact_number && (
                  <Text style={styles.errorText}>{errors.contact_number}</Text>
                )}
              </View>

              {/* Why Should We Hire You */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Why should we hire you?
                </Text>
                <TextInput
                  ref={wswhyInputRef}
                  placeholder="Tell us about your skills, experience, and why you are a great fit for this role..."
                  placeholderTextColor="#888"
                  onChangeText={handleChange("wswhy")}
                  onBlur={handleBlur("wswhy")}
                  value={values.wswhy}
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  onFocus={(event) => {
                    // 👇 Manually tell the scroll view to scroll to this input
                    scrollViewRef.current?.scrollToFocusedInput(
                      event.target,
                      120,
                    );
                  }}
                  style={[
                    styles.input,
                    styles.textArea,
                    {
                      backgroundColor: colors.card,
                      color: colors.text,
                      borderColor:
                        touched.wswhy && errors.wswhy
                          ? "#e74c3c"
                          : colors.border,
                    },
                  ]}
                />
                {touched.wswhy && errors.wswhy && (
                  <Text style={styles.errorText}>{errors.wswhy}</Text>
                )}
              </View>

              {/* Trigger Modal Submission */}
              <Pressable
                onPress={handleSubmit as () => void}
                style={({ pressed }) => [
                  styles.submitButton,
                  {
                    backgroundColor: colors.primary,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text style={styles.submitButtonText}>Submit Application</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={handleCancelSubmit}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Confirm Submission
            </Text>
            <Text style={[styles.modalText, { color: colors.text }]}>
              Are you sure you want to submit your application for{" "}
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
                onPress={handleCancelSubmit}
              >
                <Text style={[styles.modalButtonText, { color: colors.text }]}>
                  No
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.modalButton,
                  {
                    backgroundColor: colors.primary,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
                onPress={handleConfirmSubmit}
              >
                <Text style={[styles.modalButtonText, { color: "#ffffff" }]}>
                  Yes
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isSuccessModalVisible}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Application Sent!
            </Text>
            <Text style={[styles.modalText, { color: colors.text }]}>
              Your application has been successfully sent to {job.companyName}.
            </Text>
            <View style={styles.modalButtonRow}>
              <Pressable
                style={({ pressed }) => [
                  styles.modalButton,
                  {
                    backgroundColor: colors.primary,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
                onPress={handleSuccessClose}
              >
                <Text style={[styles.modalButtonText, { color: "#ffffff" }]}>
                  Okay
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default JobForm;
