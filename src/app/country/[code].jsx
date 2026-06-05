import { useLocalSearchParams } from "expo-router";
import { Linking, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CountryDetailSection } from "@/components/country-detail-section";
import { InfoRow } from "@/components/info-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useCountryDetail } from "@/hooks/use-country-detail";

function formatList(value) {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return Object.values(value).join(", ");
}

function formatCurrencies(currencies) {
  if (!currencies) {
    return null;
  }

  return Object.values(currencies)
    .map((currency) =>
      currency.symbol ? `${currency.name} (${currency.symbol})` : currency.name,
    )
    .join(", ");
}

function formatCallingCode(idd) {
  if (!idd?.root) {
    return null;
  }

  if (!idd.suffixes?.length) {
    return idd.root;
  }

  return idd.suffixes.map((suffix) => `${idd.root}${suffix}`).join(", ");
}

function formatNumber(value) {
  if (value === null || value === undefined) {
    return null;
  }

  return new Intl.NumberFormat("en-US").format(value);
}

function formatBoolean(value) {
  if (value === null || value === undefined) {
    return null;
  }

  return value ? "Yes" : "No";
}

function formatArea(value) {
  const formattedArea = formatNumber(value);

  return formattedArea ? `${formattedArea} km2` : null;
}

export default function CountryDetailScreen() {
  const { code } = useLocalSearchParams();
  const { country, isLoading, error } = useCountryDetail(code);
  const googleMapsUrl = country?.maps?.googleMaps;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {isLoading && (
          <ThemedText style={styles.statusText}>Loading country...</ThemedText>
        )}

        {error && <ThemedText style={styles.statusText}>{error}</ThemedText>}

        {!isLoading && !error && country && (
          <ScrollView contentContainerStyle={styles.content}>
            <ThemedView style={styles.header}>
              <ThemedText type="title" style={styles.title}>
                {country.flag} {country.name.common}
              </ThemedText>
              <ThemedText style={styles.subtitle} themeColor="textSecondary">
                {country.name.official}
              </ThemedText>
            </ThemedView>

            <CountryDetailSection title="General">
              <InfoRow label="Capital" value={formatList(country.capital)} />
              <InfoRow
                label="Population"
                value={formatNumber(country.population)}
              />
              <InfoRow label="Region" value={country.region} />
              <InfoRow label="Subregion" value={country.subregion} />
              <InfoRow
                label="Continent"
                value={formatList(country.continents)}
              />
              <InfoRow label="Area" value={formatArea(country.area)} />
              <InfoRow
                label="Independent"
                value={formatBoolean(country.independent)}
              />
              <InfoRow
                label="UN Member"
                value={formatBoolean(country.unMember)}
              />
            </CountryDetailSection>

            <CountryDetailSection title="Language & Currency">
              <InfoRow
                label="Languages"
                value={formatList(country.languages)}
              />
              <InfoRow
                label="Currency"
                value={formatCurrencies(country.currencies)}
              />
            </CountryDetailSection>

            <CountryDetailSection title="Geography & Travel">
              <InfoRow
                label="Border Countries"
                value={formatList(country.borders)}
              />
              <InfoRow label="Timezone" value={formatList(country.timezones)} />
              <InfoRow label="Driving Side" value={country.car?.side} />
              {googleMapsUrl && (
                <InfoRow label="Google Maps">
                  <Pressable onPress={() => Linking.openURL(googleMapsUrl)}>
                    <ThemedText type="linkPrimary">Open map</ThemedText>
                  </Pressable>
                </InfoRow>
              )}
            </CountryDetailSection>

            <CountryDetailSection title="Communication & Codes">
              <InfoRow label="Country Code" value={country.cca3} />
              <InfoRow
                label="Top Level Domain"
                value={formatList(country.tld)}
              />
              <InfoRow
                label="Calling Code"
                value={formatCallingCode(country.idd)}
              />
            </CountryDetailSection>
          </ScrollView>
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
  },
  content: {
    gap: Spacing.three,
    paddingTop: Spacing.six,
    paddingBottom: Spacing.four,
  },
  header: {
    gap: Spacing.one,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  statusText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
