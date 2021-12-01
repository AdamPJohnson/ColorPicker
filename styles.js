import { StyleSheet } from "react-native";

const bgColor = "white";

const styles = StyleSheet.create({
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
  colorNameLabel: {
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 8,
  },
  submitButton: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
    padding: 5,
    borderRadius: 5,
    opacity: 0.8,
  },
});

export default styles;
