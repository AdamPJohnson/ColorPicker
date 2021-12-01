import { StyleSheet } from "react-native";

const bgColor = "white";

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    backgroundColor: bgColor,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: bgColor,
    alignItems: "center",
    justifyContent: "center",
  },
  colorScrollContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    justifyContent: "center",
    backgroundColor: bgColor,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 30,
    width: "80%",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.2)",
    backgroundColor: "whitesmoke",
    margin: 15,
  },

  scrollUpButton: {
    position: "absolute",
    top: 35,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: 100,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  scrollDownButton: {
    position: "absolute",
    bottom: 35,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    // width: 100,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
});

export default styles;
