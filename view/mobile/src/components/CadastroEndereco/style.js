import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },

  header: {
    backgroundColor: '#790000',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5
  },

  titulo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },

  form: {
    padding: 20,
    marginTop: 25,
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 18,
    elevation: 2,
  },

  botao: {
    backgroundColor: '#790000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    elevation: 3
  },
  
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  
  cancelar: {
    textAlign: 'center',
    marginTop: 15,
    color: '#777',
    fontSize: 14
  }
});