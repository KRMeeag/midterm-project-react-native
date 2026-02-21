import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { JobsProcessed } from '../types'; 
import { useJob } from '../contexts/JobContext';

export const JobCard = ({ job }: { job: JobsProcessed }) => {
  const { colors } = useTheme();
  const { onBookmarksPress } = useJob(); 

  const logoInitial = job.companyName ? job.companyName.charAt(0).toUpperCase() : '?';
  const displayTags = [job.jobType, job.workModel, job.seniorityLevel].filter(Boolean);
  
  const formatSalary = () => {
    if (job.minSalary && job.maxSalary) return `${job.minSalary} - ${job.maxSalary} ${job.currency}`;
    if (job.minSalary) return `${job.minSalary}+ ${job.currency}`;
    return 'Salary undisclosed';
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.headerRow}>
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
              style={styles.company}
              numberOfLines={1} 
              ellipsizeMode="tail"
            >
              {job.companyName}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => onBookmarksPress(job.id)} style={styles.bookmarkContainer}>
          <MaterialIcons 
            name={job.isSaved ? "bookmark" : "bookmark-border"} 
            size={28} 
            color={colors.primary} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tagsContainer}>
        {displayTags.map((tag, index) => (
          <View key={index} style={[styles.tag, { backgroundColor: colors.background }]}>
            <Text style={[styles.tagText, { color: colors.text }]}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footerRow}>
        <Text style={[styles.price, { color: colors.primary }]}>{formatSalary()}</Text>
        <TouchableOpacity style={[styles.applyButton, { backgroundColor: colors.accent }]}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  logoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Enforces boundary
  },
  textContainer: {
    flex: 1, // Shrinks to fit available space
    paddingRight: 10, // Prevents text from touching the bookmark icon
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#888',
  },
  bookmarkContainer: {
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1, // Ensures price respects apply button boundary
    paddingRight: 10,
  },
  applyButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});