import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eae4d8", // fundo escuro moderno
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  logo: {
    width: 100,
    height: 100,
  },

  content: {
    width: "80%",
  },

  title: {
    fontSize: 28,
    color: "#030000",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  label: {
    color: "#000000",
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#1E293B",
    color: "#ffffff",
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#b80025",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});