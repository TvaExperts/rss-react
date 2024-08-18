import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { schema } from 'components/forms/schema';
import { ValidationError } from 'yup';

import { FormDataInputs } from '../../types';
import ROUTES from '../../router/routes';
import styles from './Form.module.css';
import { convertInputsDataToLineData } from '../../utils/convertInputsDataToLineData';
import { filterCountriesForAutocomplete } from '../../utils/filterCountriesForAutocomplete';
import { useAppDispatch } from '../../store/store';
import { formsDataSlice } from '../../store/formsData.slice';

function getGenderFromInputValue(value: string | undefined) {
  if (!value) {
    return 'male';
  }
  return value === 'female' ? 'female' : 'male';
}

export function UncontrolledForm() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRefs = {
    name: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    passwordConfirm: useRef<HTMLInputElement>(null),
    gender: useRef<HTMLSelectElement>(null),
    acceptTC: useRef<HTMLInputElement>(null),
    image: useRef<HTMLInputElement>(null),
    country: useRef<HTMLInputElement>(null),
  };

  const [isOpenSuggestion, setIsOpenSuggestion] = useState<boolean>(false);

  const [filteredCountries, setFilteredCountries] = useState<string[]>(
    filterCountriesForAutocomplete(formRefs.country.current?.value || '')
  );

  function handleChangeCountry(textValue: string) {
    if (formRefs.country.current?.value) {
      formRefs.country.current.value = textValue;
      setFilteredCountries(filterCountriesForAutocomplete(textValue));
      setIsOpenSuggestion(true);
    }
  }

  function handleClickSuggestion(country: string) {
    if (formRefs.country.current?.value) {
      formRefs.country.current.value = country;
      setFilteredCountries(filterCountriesForAutocomplete(country));
      setIsOpenSuggestion(!isOpenSuggestion);
    }
  }

  function getFormData(): FormDataInputs {
    return {
      name: formRefs.name.current?.value || '',
      age: Number(formRefs.age.current?.value) || 0,
      email: formRefs.email.current?.value || '',
      password: formRefs.password.current?.value || '',
      passwordConfirm: formRefs.passwordConfirm.current?.value || '',
      gender: getGenderFromInputValue(formRefs.gender.current?.value),
      acceptTC: !!formRefs.acceptTC.current?.checked,
      imageFile: formRefs.image.current?.files
        ? formRefs.image.current?.files[0]
        : undefined,
      country: formRefs.country.current?.value || '',
    };
  }

  function parseErrors(validationErrors: ValidationError) {
    const newErrors: Record<string, string> = {};

    validationErrors.inner.forEach((error) => {
      if (!error.path) return;
      if (!newErrors[error.path]) {
        // eslint-disable-next-line prefer-destructuring
        newErrors[error.path] = error.errors[0];
      }
    });
    setErrors(newErrors);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = getFormData();
    schema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        const dataToStore = await convertInputsDataToLineData(
          formData,
          'uncontrolled'
        );
        dispatch(formsDataSlice.actions.addLine(dataToStore));
        navigate(ROUTES.home);
      })
      .catch(parseErrors);
  }

  function hasSuggestions() {
    return !!(
      formRefs.country.current?.value &&
      formRefs.country.current?.value.length !== 0 &&
      filteredCountries.length !== 0 &&
      isOpenSuggestion
    );
  }

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <label htmlFor="name">
          Name:
          <input type="text" name="name" id="name" ref={formRefs.name} />
          {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
        </label>
        <label htmlFor="age">
          Age:
          <input
            type="number"
            name="age"
            id="age"
            ref={formRefs.age}
            defaultValue="0"
          />
          {errors.age && <p className={styles.errorMessage}>{errors.age}</p>}
        </label>
        <label htmlFor="email">
          Email:
          <input type="text" name="email" id="email" ref={formRefs.email} />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            ref={formRefs.password}
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password}</p>
          )}
        </label>
        <label htmlFor="passwordConfirm">
          Password Confirmation:
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            ref={formRefs.passwordConfirm}
          />
          {errors.passwordConfirm && (
            <p className={styles.errorMessage}>{errors.passwordConfirm}</p>
          )}
        </label>
        <label htmlFor="gender">
          Gender:
          <select
            ref={formRefs.gender}
            defaultValue="Male"
            name="gender"
            id="gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className={styles.errorMessage}>{errors.gender}</p>
          )}
        </label>
        <label htmlFor="image">
          Image:
          <input
            type="file"
            id="image"
            name="image"
            accept=".png, .jpg"
            ref={formRefs.image}
          />
          {errors.imageFile && (
            <p className={styles.errorMessage}>{errors.imageFile}</p>
          )}
        </label>

        <label htmlFor="country" className={styles.label}>
          Country:
          <input
            type="text"
            onChange={(event) => handleChangeCountry(event.target.value)}
            id="country"
            ref={formRefs.country}
          />
          {errors.country && (
            <p className={styles.errorMessage}>{errors.country}</p>
          )}
          {hasSuggestions() && (
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
        <label htmlFor="acceptTC">
          Accept T&C:
          <input
            type="checkbox"
            name="acceptTC"
            id="acceptTC"
            ref={formRefs.acceptTC}
          />
          {errors.acceptTC && (
            <p className={styles.errorMessage}>{errors.acceptTC}</p>
          )}
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
