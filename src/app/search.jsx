import { useMemo, useState } from "react";
import { FlatList, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CountryListItem } from "@/components/country-list-item";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useCountries } from "@/hooks/use-countries";
import { useTheme } from "@/hooks/use-theme";

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const { countries, isLoading, error } = useCountries();
  const theme = useTheme();

  const filteredCountries = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return countries;
    }

    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(normalizedSearch)
    );
  }, [countries, searchTerm]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Search
          </ThemedText>
          <TextInput
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search countries..."
            placeholderTextColor={theme.textSecondary}
            style={[
              styles.searchInput,
              {
                color: theme.text,
                backgroundColor: theme.backgroundElement,
              },
            ]}
          />
        </ThemedView>

        {isLoading && (
          <ThemedText style={styles.statusText}>Loading countries...</ThemedText>
        )}

        {error && <ThemedText style={styles.statusText}>{error}</ThemedText>}

        {!isLoading && !error && (
          <FlatList
            data={filteredCountries}
            keyExtractor={(country) => country.cca3}
            renderItem={({ item }) => <CountryListItem country={item} />}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
          />
        )}
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
    paddingTop: Spacing.six,
    gap: Spacing.four,
  },
  header: {
    gap: Spacing.three,
  },
  title: {
    textAlign: "center",
  },
  searchInput: {
    height: 48,
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
  statusText: {
    textAlign: "center",
  },
  listContent: {
    paddingBottom: Spacing.four,
  },
  separator: {
    height: Spacing.two,
  },
});
