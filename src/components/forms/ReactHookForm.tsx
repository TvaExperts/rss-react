import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css';
import { FormDataInputs } from '../../types';
import schema from './resolvers/schema';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { formsDataActions } from '../../reducers/FormsDataSlice';
import ROUTES from '../../router/routes';
import { convertInputsDataToStore } from '../../utils/convertInputsDataToStore';
import { filterCountries } from '../../utils/filterCountries';

function ReactHookForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOpenSuggestion, setIsOpenSuggestion] = useState<boolean>(false);

  const { countries } = useAppSelector((state) => state.countriesReducer);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
    watch,
    trigger,
  } = useForm<FormDataInputs>({
    mode: 'onChange',
    resolver: yupResolver<FormDataInputs>(schema),
  });

  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

  const onSubmit: SubmitHandler<FormDataInputs> = async (formData) => {
    const dataToStore = await convertInputsDataToStore(formData);
    dispatch(formsDataActions.addLine(dataToStore));
    navigate(ROUTES.home);
  };

  const countryText = watch('country', '');

  useEffect(() => {
    setValue('country', countryText);
    const suggestions = filterCountries(countries, countryText);
    setFilteredCountries(suggestions);
    if (!(suggestions.length === 1 && suggestions[0] === countryText)) {
      setIsOpenSuggestion(true);
    } else {
      setIsOpenSuggestion(false);
    }
  }, [countries, countryText, setValue]);

  function handleClickSuggestion(country: string) {
    setValue('country', country);
    setFilteredCountries(filterCountries(countries, country));
    setIsOpenSuggestion(false);
    trigger('country');
  }

  function hasSuggestions() {
    return (
      getValues().country &&
      getValues().country.length !== 0 &&
      filteredCountries.length !== 0 &&
      isOpenSuggestion
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label htmlFor="name">
        Name:
        <input {...register('name')} type="text" name="name" id="name" />
        {errors.name && (
          <p className={styles.errorMessage}>{errors.name.message}</p>
        )}
      </label>
      <label htmlFor="age">
        Age:
        <input {...register('age')} type="number" name="age" id="age" />
        {errors.age && (
          <p className={styles.errorMessage}>{errors.age.message}</p>
        )}
      </label>
      <label htmlFor="email">
        Email:
        <input {...register('email')} type="email" name="email" id="email" />
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}
      </label>
      <label htmlFor="password">
        Password:
        <input
          {...register('password')}
          type="password"
          name="password"
          id="password"
        />
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password.message}</p>
        )}
      </label>
      <label htmlFor="passwordConfirm">
        Password Confirmation:
        <input
          {...register('passwordConfirm')}
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
        />
        {errors.passwordConfirm && (
          <p className={styles.errorMessage}>
            {errors.passwordConfirm.message}
          </p>
        )}
      </label>
      <label htmlFor="gender">
        Gender:
        <select {...register('gender')}>
          <option>Male</option>
          <option>Female</option>
        </select>
        {errors.gender && (
          <p className={styles.errorMessage}>{errors.gender.message}</p>
        )}
      </label>

      <label htmlFor="image">
        Image:
        <input
          type="file"
          id="image"
          accept=".png, .jpg"
          {...register('imageFile')}
        />
        {errors.imageFile && (
          <p className={styles.errorMessage}>{errors.imageFile.message}</p>
        )}
      </label>

      <label htmlFor="country" className={styles.label}>
        Country:
        <input type="text" id="country" {...register('country')} />
        {errors.country && (
          <p className={styles.errorMessage}>{errors.country.message}</p>
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
          {...register('acceptTC')}
          type="checkbox"
          name="acceptTC"
          id="acceptTC"
        />
        {errors.acceptTC && (
          <p className={styles.errorMessage}>{errors.acceptTC.message}</p>
        )}
      </label>

      <button type="submit" disabled={!!Object.keys(errors).length || !isValid}>
        Submit
      </button>
    </form>
  );
}

export default ReactHookForm;
