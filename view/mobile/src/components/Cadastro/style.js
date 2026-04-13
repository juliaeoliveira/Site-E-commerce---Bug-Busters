import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eae4d8",
  },

  // IMAGEM TOPO
  topo: {
    width: 450,
    height: 370,
    justifyContent: "flex-end",
    padding: 20,
  },

  titulo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  // FORMULÁRIO (CARD)
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    marginTop: -20,
    padding: 20,
  },

  label: {
    fontSize: 13,
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#eee",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  botao: {
    backgroundColor: "#8B0000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },

  login: {
    textAlign: "center",
    marginTop: 15,
    textDecorationLine: "underline",
  },
});