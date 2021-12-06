import { StyleSheet } from "react-native";

const bgColor = "white";

const styles = StyleSheet.create({
  welcome: { fontSize: 20, fontWeight: "bold" },
  welcomeSubtitle: { fontSize: 15, fontStyle: "italic" },
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
    borderColor: "white",
    textAlign: "center",
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.2)",
    backgroundColor: "whitesmoke",
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
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
    backgroundColor: "grey",
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
    backgroundColor: "grey",
    opacity: 0.5,
  },
  backButton: {
    position: "absolute",
    bottom: 50,
    right: 50,
    backgroundColor: "white",
    padding: 10,

    opacity: 0.4,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  copyButton: {
    position: "absolute",
    bottom: 50,
    left: 50,
    backgroundColor: "white",
    padding: 10,

    opacity: 0.4,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 90,
    backgroundColor: "white",
    padding: 5,
    opacity: 0.4,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
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
    marginTop: 50,
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
    marginBottom: 10,
  },
});

export default styles;
