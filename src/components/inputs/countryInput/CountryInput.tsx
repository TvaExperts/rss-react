import { forwardRef, useState } from 'react';
import styles from './CountryInput.module.css';
import { useAppSelector } from '../../../hooks/redux';

function filterCountries(countries: string[], query: string) {
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

const CountryInput = forwardRef<HTMLInputElement>((_, ref) => {
  const [text, setText] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { countries } = useAppSelector((state) => state.countriesReducer);

  const filteredCountries = filterCountries(countries, text);

  function handleChangeText(textValue: string) {
    setText(textValue);
    setIsOpen(true);
  }

  function handleClickSuggestion(country: string) {
    setText(country);
    setIsOpen(!isOpen);
  }

  return (
    <label htmlFor="country" className={styles.label}>
      Country:
      <input
        type="text"
        placeholder="Select your country..."
        value={text}
        onChange={(event) => handleChangeText(event.target.value)}
        id="country"
        className={styles.input}
        ref={ref}
      />
      {text.length !== 0 && filteredCountries.length !== 0 && isOpen && (
        <ul className={styles.list}>
          {filteredCountries.map((country) => {
            return (
              <li
                className={styles.item}
                key={country}
                onClick={() => handleClickSuggestion(country)}
              >
                {country}
              </li>
            );
          })}
        </ul>
      )}
    </label>
  );
});

export default CountryInput;
