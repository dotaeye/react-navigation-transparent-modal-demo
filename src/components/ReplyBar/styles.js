import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    height: 70,
    width: width,
    paddingHorizontal: 10,
    paddingBottom: 20
  },
  containerOpen: {
    height: 140
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    width,
    backgroundColor: "#fff",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1
  },
  topBarBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5
  },
  topBarBtnText: {
    fontSize: 14,
    color: "#ddd"
  },
  bar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 50
  },
  barOpen: {
    height: 90
  },
  inputWrapper: {
    height: 36,
    borderRadius: 18,
    backgroundColor: "#eee",
    flex: 1,
    paddingHorizontal: 10,
    marginRight: 10
  },
  inputWrapperOpen: {
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 0,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 0
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#ddd",
    textAlignVertical: "center",
    padding: 0,
    height: 30,
    marginLeft: 5
  },
  inputOpen: {
    height: 60,
    textAlignVertical: "top",
    marginLeft: 0
  }
});
