import { COUNTRIES } from '../constants/countries';

export function filterCountriesForAutocomplete(query: string) {
  const countriesStartsWith = COUNTRIES.filter((country) =>
    country.toLowerCase().startsWith(query.toLowerCase())
  );

  const otherMatchCountries = COUNTRIES.filter(
    (country) =>
      country.toLowerCase().includes(query.toLowerCase()) &&
      !countriesStartsWith.includes(country)
  );

  return [...countriesStartsWith, ...otherMatchCountries];
}
