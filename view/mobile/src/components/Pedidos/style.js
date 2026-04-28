import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
         backgroundColor: "#eae4d8",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
     backgroundColor: "#eae4d8",
  },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#222",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  status: {
    fontSize: 13,
    fontWeight: "bold",
  },

  text: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000",
  },

  button: {
    marginTop: 14,
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  empty: {
    fontSize: 16,
    color: "#777",
  },
});