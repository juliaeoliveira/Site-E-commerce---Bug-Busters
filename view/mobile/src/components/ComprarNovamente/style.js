import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
       backgroundColor: "#eae4d8",
  },

  title: {
    marginTop: 35,
    marginLeft: 75,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,

    // sombra iOS
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,

    // sombra Android
    elevation: 3,
  },

  nome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },

  preco: {
    fontSize: 14,
    color: "#2e7d32",
    marginTop: 6,
    fontWeight: "500",
  },

  emptyText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 30,
  },
});