import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eae4d8",
  },

  // IMAGEM TOPO
  topo: {
    width: 450,
    height: 310,
    justifyContent: "flex-end",
    padding: 20,
    marginTop: -40,
  },
  entre:{
    color: "#c2a46d",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },


  title: {
    fontSize: 20,
    color: "#030000",
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "center",
  },

  // FORMULÁRIO (CARD)
  formContainer: {
    flex: 1,
    backgroundColor: "#f8f3eb",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    marginTop: -35,
    padding: 20,
  },

  label: {
    color: "#333",
    fontSize: 13,
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#eee0c2",
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
     color: "#333",

    textAlign: "center",
    marginTop: 15,
    textDecorationLine: "none",
  },
});