import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#eae4d8",
    padding:10,
  },

  header: {
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 20,
  },

  foto: {
    color: '#000000ff',
    marginBottom: 10,
  },

  username: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },

  label: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },

  value: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
  },

  botaoEditar: {
    padding: 4,
  },
});