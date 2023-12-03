export function filterCountries(countries: string[], query: string) {
  const countriesStartsWith = countries.filter((country) =>
    country.toLowerCase().startsWith(query.toLowerCase())
  );
  const otherMatchCountries = countries.filter(
    (country) =>
      country.toLowerCase().includes(query.toLowerCase()) &&
      !countriesStartsWith.includes(country)
  );
  return [...countriesStartsWith, ...otherMatchCountries];
}
