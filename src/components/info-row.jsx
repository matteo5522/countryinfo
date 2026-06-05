import { StyleSheet } from "react-native";

import { Spacing } from "@/constants/theme";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export function InfoRow({ label, value, children }) {
  const hasValue = value !== null && value !== undefined && value !== "";

  if (!hasValue && !children) {
    return null;
  }

  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
        {label}
      </ThemedText>
      <ThemedView type="backgroundElement" style={styles.valueContainer}>
        {children ?? (
          <ThemedText type="smallBold" style={styles.value}>
            {value}
          </ThemedText>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: Spacing.three,
    paddingVertical: Spacing.two,
  },
  label: {
    flex: 1,
  },
  valueContainer: {
    flex: 2,
    alignItems: "flex-end",
  },
  value: {
    textAlign: "right",
  },
});
