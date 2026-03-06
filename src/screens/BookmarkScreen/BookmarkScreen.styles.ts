import { StyleSheet } from "react-native";

export const bookmarkScreenStyles = StyleSheet.create({
  rootContainer: { flex: 1 },
  container: { flex: 1 },
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  headerAction: {
    position: "absolute",
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerActionText: { fontSize: 14, fontWeight: "600", marginLeft: 4 },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  actionButton: { padding: 8 },
  actionText: { fontSize: 16 },
  selectedCount: { fontSize: 16, fontWeight: "600" },
  listContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  flatListContent: { paddingBottom: 20, flexGrow: 1 },

  // Toast Styles (Added)
  chipContainer: {
    position: "absolute",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  chipText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  // Empty State Styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 20,
    opacity: 0.8,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    lineHeight: 20,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 22,
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: { fontSize: 16, fontWeight: "bold" },
});