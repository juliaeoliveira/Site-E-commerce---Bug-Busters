import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eae4d8",
  },

  header: {
    marginTop: 60,
    height: 80,
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  circlesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
  },

  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  width: "30%",
  marginHorizontal: "1.5%",
  marginBottom: 25,
  alignItems: "center",
},

  dressImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },

  dressName: {
    fontSize: 12,
    textAlign: "center",
  },
});
