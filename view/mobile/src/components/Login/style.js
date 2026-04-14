import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f3eb", // fundo escuro moderno
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  logo: {
    
    width: 150,
    height: 150,
  },

  content: {
    width: "80%",
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
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#800000",
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
  texto: {
  textAlign: 'center',
  marginTop: 15,
  fontSize: 14,
  color: '#333',
  },

  cadastro: {
    color: '#c2a46d', // mesma cor do seu tema
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});