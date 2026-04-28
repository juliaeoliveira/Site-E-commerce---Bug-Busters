import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  header: {
    backgroundColor: '#790000',
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  titulo: {
    color: "#fff",
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
  },

  box: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },

  texto: {
    color: '#790000',
    fontSize: 17,
  },

  link: {
    color: "#d32f2f",
    marginTop: 30,
    fontWeight: "bold",
  },

  dado: {
    fontSize: 16,
    marginTop: 5,
    padding:5,
  },

  form: {
    padding: 20,
    marginTop: 20,
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },

  botao: {
    backgroundColor: '#790000',
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },

  cancelar: {
    textAlign: "center",
    marginTop: 15,
    color: "#777",
  },
});