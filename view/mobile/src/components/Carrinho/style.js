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
    color: '#790000',
    fontSize: 22,
    fontWeight: "900",
  },

  card: {
    backgroundColor: "#d9d3c7",
    marginHorizontal: 10,
    marginBottom: 15,
    padding: 20,
    borderRadius: 8,
  },

  sectionTitle: {
    color: 'black',
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
    fontSize: 14,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    marginVertical: 10,
  },

  link: {
    fontSize: 13,
    marginBottom: 4,
  },
});