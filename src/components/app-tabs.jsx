import { Link, usePathname } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { MaxContentWidth, Spacing } from "@/constants/theme";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
];

export default function AppTabs() {
  const pathname = usePathname();

  return (
    <View style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.innerContainer}>
        <ThemedText type="smallBold" style={styles.brandText}>
          Country Info
        </ThemedText>

        {tabs.map((tab) => (
          <Link key={tab.href} href={tab.href} asChild>
            <Pressable>
              <ThemedView
                type={pathname === tab.href ? "backgroundSelected" : "backgroundElement"}
                style={styles.tabButtonView}
              >
                <ThemedText
                  type="small"
                  themeColor={pathname === tab.href ? "text" : "textSecondary"}
                >
                  {tab.label}
                </ThemedText>
              </ThemedView>
            </Pressable>
          </Link>
        ))}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    padding: Spacing.three,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.five,
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
  },
  brandText: {
    marginRight: "auto",
  },
  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
});
