import { Image } from "expo-image";
import { StyleSheet } from "react-native";

export function AnimatedSplashOverlay() {
  return null;
}

export function AnimatedIcon() {
  return (
    <Image style={styles.image} source={require("@/assets/images/globe.png")} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    maxWidth: 760,
    aspectRatio: 1540 / 904,
    contentFit: "contain",
  },
});
