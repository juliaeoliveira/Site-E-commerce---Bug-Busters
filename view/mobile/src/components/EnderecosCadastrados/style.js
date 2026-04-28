import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f4f6f8'
  },

  header: {
    height: 200,
    backgroundColor: '#790000',
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },

  username: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  },

  card: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    marginTop: 50,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333'
  },

  botaoEditar: {
    marginTop: 20,
    backgroundColor: '#790000',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center'
  },

  botaoSalvar: {
    backgroundColor: '#790000',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center'
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold'
  },

  cancelar: {
    textAlign: 'center',
    marginTop: 15,
    color: '#333'
  },

  erro: {
    color: 'red',
    marginTop: 5
  },

  infoBox: {
    marginBottom: 12
  },

  label: {
    color: '#888'
  },

  value: {
    padding: 1,
    fontSize: 16
  },

  inputBox: {
    marginBottom: 15
  },

  inputLabel: {
    marginBottom: 5,
    color: '#555'
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8
  },

  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },

  emptyText: {
    color: '#790000',
    fontSize: 17,
  },

  buttonText: {
    color: "#d32f2f",
    marginTop: 30,
    fontWeight: "bold",
  }

});