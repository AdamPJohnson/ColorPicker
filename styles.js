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
    display: "flex",
    flexDirection: "column",
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
    opacity: 0.5,
  },
  scrollDownButton: {
    position: "absolute",
    bottom: 35,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: 100,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    opacity: 0.5,
  },
  backButton: {
    position: "absolute",
    bottom: 50,
    right: 50,
  },
  copyButton: {
    position: "absolute",
    bottom: 50,
    left: 50,
  },
  addButton: {
    position: "absolute",
    bottom: 85,
  },
  addColorModal: {
    position: "absolute",
  },
  centeredView: {
    height: "100%",
    width: "100%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  innerModal: {
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    opacity: 0.9,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  closeModalButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  picker: {
    margin: 100,
    width: "80%",
    // height: "100%",
  },
});

export default styles;
