import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f3eb",
  },

  // IMAGEM TOPO
  topo: {
    height: 550,
    justifyContent: "flex-end",
    padding: 20,
  },

  tituloTopo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  // CARD
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
    marginTop: -150, // sobe o card
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  title: {
    fontSize: 24,
    color: "#030000",
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },

  label: {
    color: "#523800",
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#eee0c2",
    color: "#523800",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#800000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  texto: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 14,
    color: "#333",
  },

  cadastro: {
    color: "#c2a46d",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});