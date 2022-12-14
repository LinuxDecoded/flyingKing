import { StyleSheet } from "react-native"

export default styleSheet = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "aqua"
    },
    king: {
        position: "absolute",
        width: 55,
        height: 55,
    },
    obstacle: {
        position: "absolute",
        width: 20,
        backgroundColor: "brown",
        borderWidth: 5,
        borderColor: "black"
    },
    playButton: {
        height: 100,
        width: 100,
    },
    overlay: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        opacity: 0.9,
      },
      gameName: {
        fontSize: 50,
        color: "limegreen",
        fontWeight: "bold"
      },
      score: {
        fontSize: 30,
        color: "limegreen",
        fontWeight: "bold"
      },
      liveScore: {
        fontSize: 35,
        color: "brown",
        fontWeight: "bold",
        position: "absolute"
      },
      liveScoreContainer: {
        position: "absolute",
        top: 10,
        height: 42,
        width: 70,
        borderRadius: 10,
        backgroundColor: "limegreen",
        zIndex: 999,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "brown"
      }
})