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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    borderColor: '#790000',
    height: 65,
    width: 60,
  },

  circleImage: {
    width: "100%",
    height: "100%",
  },


  dressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  dressCard: {
    width: "30%",
    alignItems: "center",
  },

  dressImage: {
    width: 100,
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },

  dressName: {
    fontSize: 12,
    textAlign: "center",
  },
});