import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <Image
            source={require("@/assets/images/globe.png")}
            style={styles.heroImage}
            contentFit="contain"
          />
          <ThemedText type="title" style={styles.title}>
            Welcome to Country Info
          </ThemedText>
          <ThemedText style={styles.description}>
            Search countries and discover useful facts in one place.
          </ThemedText>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    alignItems: "center",
    gap: Spacing.three,
  },
  heroSection: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.four,
  },
  heroImage: {
    width: "100%",
    maxWidth: 760,
    aspectRatio: 1540 / 904,
  },
  title: {
    textAlign: "center",
  },
  description: {
    maxWidth: 420,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.72,
  },
});
