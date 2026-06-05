import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import { Spacing } from "@/constants/theme";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export function CountryListItem({ country }) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.pressable}
      onPress={() => router.push(`/country/${country.cca3}`)}
    >
      <ThemedView type="backgroundElement" style={styles.container}>
        <Image
          source={country.flags.png}
          accessibilityLabel={country.flags.alt}
          style={styles.flag}
          contentFit="cover"
        />
        <ThemedView type="backgroundElement" style={styles.textContainer}>
          <ThemedText type="smallBold">{country.name.common}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {country.name.official}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
    width: "100%",
  },
  flag: {
    width: 56,
    height: 38,
    borderRadius: Spacing.one,
  },
  textContainer: {
    flex: 1,
    gap: Spacing.half,
  },
});
