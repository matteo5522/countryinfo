const BASE_URL = "https://restcountries.com/v3.1";

export async function fetchCountryPreviews() {
  const response = await fetch(`${BASE_URL}/all?fields=name,flags,cca3`);

  if (!response.ok) {
    throw new Error("Countries could not be loaded.");
  }

  const countries = await response.json();

  return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
}

export async function fetchCountryDetail(code) {
  const response = await fetch(
    `${BASE_URL}/alpha/${encodeURIComponent(code)}?fields=name,flag,flags,coatOfArms,cca3,capital,population,languages,currencies,region,subregion,continents,area,timezones,borders,maps,tld,idd,car,independent,unMember`,
  );

  if (!response.ok) {
    throw new Error("Country could not be loaded.");
  }

  return response.json();
}
