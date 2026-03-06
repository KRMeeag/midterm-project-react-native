import { StyleSheet } from "react-native";

export const jobCardStyles = StyleSheet.create({
  card: { borderRadius: 16, padding: 20, marginBottom: 15, borderWidth: 1 },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12, // Reduced slightly
  },
  checkboxContainer: { justifyContent: "center", marginRight: 15, height: 50 },
  logoTitleContainer: { flexDirection: "row", alignItems: "center", flex: 1 },
  textContainer: { flex: 1 },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    overflow: "hidden",
  },
  logoText: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  company: { fontSize: 14 },
  
  // New Info Section Styles
  infoSection: {
    marginBottom: 12,
    gap: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 13,
  },
  
  tagsContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: { fontSize: 12, fontWeight: "600" },
  price: { fontSize: 16, fontWeight: "bold", marginBottom: 15 },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 15,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: { borderWidth: 1 },
  applyButton: { borderWidth: 0 },
  actionButtonText: { fontWeight: "bold", fontSize: 14 },
});