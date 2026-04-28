import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  titulo: {
    fontFamily: 'Aboreto_400Regular',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#790000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  contentContainer: {
    paddingBottom: 20,
  },

  colecaoContainer: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },

  nomeColecao: {
    fontFamily: 'Aboreto_400Regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#523800',
    marginBottom: 15,
    textTransform: 'capitalize',
  },

  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  card: {
    width: '48%',
    marginBottom: 20,
  },

  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 3,
  },

  cardNome: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '500',
    marginHorizontal: 6,
  },

  cardPreco: {
    fontSize: 12,
    color: '#777',
    marginHorizontal: 6,
    marginTop: 2,
  },
});
