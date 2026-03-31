import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  body: {
    backgroundColor: "#b9d8f0",
    width: "100%",
    height: "100%",
  },
  title: {
    marginTop:"15%",
    marginLeft: 15,
    fontSize: 28,
    fontWeight: "bold",
  },
  addContent: {
    width: "80%",
    marginTop: "5%",
    marginLeft: "6%",
    flexDirection:"row"
    
  },
  addImage: {
    width: 30,
    height:30,
    //objectFit: "cover"
  },
  addInput: {
    width: "90%",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: "5%",
    paddingHorizontal: 10,
    borderRadius:5
  },
    addEnunciado: {
    width: "80%",
    marginTop: "15%",
    marginLeft: "15%",
    textAlign: "left",

  },
});
