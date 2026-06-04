import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { Spacing } from "@/constants/theme";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export function CountryListItem({ country }) {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
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
