import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eae4d8",
  },

  header: {
    marginTop: 60,
    justifyContent: "center",
  },

titleContainer: {
  width: "100%",
  backgroundColor: "#790000", // cor da faixa
  paddingVertical: 12,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 15,
},

title: {
  fontSize: 22,
  fontWeight: "bold",
  color: "#fff4f4",
  textAlign: "center",
},

  circlesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
  },

  circle: {
    width: 70,
    height: 65,
    borderRadius: 40,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },

  circleActive: {
    borderColor: "#790000",
  },

  circleImage: {
    width: "100%",
    height: "100%",
  },

  dressContainer: {
    paddingHorizontal: 10,
  },
  dressCard: {
  marginTop: 30,
  width: "30%",
  marginHorizontal: "10%",
  marginBottom: 25,
},

  dressImage: {
    marginLeft: -25,
    width: "140%",
    height: 260,
    borderRadius: 10,
    marginBottom: 5,
  },

  dressName: {
    marginRight: 0,
    fontSize: 14,
    marginBottom: 3,
  },

  dressPrice: {
     marginRight: 40,
    fontSize: 12,
    color: "#777",

  },
});
