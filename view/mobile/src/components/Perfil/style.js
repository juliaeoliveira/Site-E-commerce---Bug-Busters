import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  body: {
    backgroundColor: "#eae4d8",
    flex: 1,
    paddingTop: "15%",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 50,
    marginTop: 40,
    gap: 10,
  },

  username: {
    color: '#000000',
    fontSize: 25,
    fontWeight: "900",
  },

  foto: {
    marginTop: -26,
  },

  card: {
    backgroundColor: "#d9d3c7",
    marginHorizontal: 10,
    marginBottom: 15,
    padding: 20,
    borderRadius: 10,
  },

  cards:{
    width:'100%',
    backgroundColor: '#790000',
    marginHorizontal: 0,
    marginBottom: 0,
    padding: 25,
    borderRadius: 0,
  },

  sectionTitle: {
    color: 'black',
    fontSize: 17,
    fontWeight: 800,
    marginBottom: 40,
  },

  sectionTitles: {
    color: 'white',
     fontSize: 17,
    fontWeight: 800,
    marginBottom: 40,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  item: {
    alignItems: "center",
    gap: 5,
  },

  supportItem: {
    
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },

  supportText: {
    color: "white",
    fontSize: 14,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    marginVertical: 10,
  },

  link: {
    color: "white",
    fontSize: 13,
    marginBottom: 4,
  },

  botaoPerfil: {
  marginTop: 5,
  backgroundColor: '#000000', // azul estilo iOS
  paddingVertical: 4,
  paddingHorizontal: 10,
  borderRadius: 8,
  alignSelf: 'flex-start'
},


botaoSair: {
  marginTop: 10,
  backgroundColor: '#790000', // vermelho estilo iOS
  paddingVertical: 5,
  paddingHorizontal: 12,
  borderRadius: 8,
  alignSelf: 'flex-start'
},

textoBotaoSair: {
  color: '#fff',
  fontSize: 13,
  fontWeight: '600'
},

// MODAL

modalBackground: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.7)",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
},

modalContainer: {
  width: "100%",
  backgroundColor: "#1C1C1E",
  borderRadius: 20,
  padding: 22,
  maxHeight: "70%",
  borderWidth: 1,
  borderColor: "#2C2C2E",
},

modalTitle: {
  color: "#fff",
  fontSize: 22,
  fontWeight: "bold",
  marginBottom: 15,
  textAlign: "center",
},

modalText: {
  color: "#DDD",
  fontSize: 16,
  lineHeight: 24,
  textAlign: "justify",
},

closeButton: {
  marginTop: 20,
  backgroundColor: '#790000',
  borderRadius: 12,
  paddingVertical: 12,
  alignItems: "center",
},

closeButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},

});