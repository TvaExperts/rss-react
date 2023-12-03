import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CountryInput, ImageInput } from 'components/index';
import schema from 'components/forms/resolvers/schema';
import { ValidationError } from 'yup';
import { useAppDispatch } from '../../hooks/redux';
import { FormDataLine } from '../../types';
import { formsDataActions } from '../../reducers/FormsDataSlice';
import ROUTES from '../../router/routes';
import styles from './Form.module.css';

function UncontrolledForm() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [imageData, setImageData] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRefs = {
    name: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    passwordConfirm: useRef<HTMLInputElement>(null),
    gender: useRef<HTMLSelectElement>(null),
    acceptTC: useRef<HTMLInputElement>(null),
    image: React.createRef<HTMLInputElement>(),
    country: React.createRef<HTMLInputElement>(),
  };

  function getFormData(): FormDataLine {
    return {
      name: formRefs.name.current?.value || '',
      age: Number(formRefs.age.current?.value) || 0,
      email: formRefs.email.current?.value || '',
      password: formRefs.password.current?.value || '',
      passwordConfirm: formRefs.passwordConfirm.current?.value || '',
      gender: formRefs.gender.current?.value || '',
      acceptTC: formRefs.acceptTC.current?.value === 'true',
      image: imageData,
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
      .then(() => {
        dispatch(formsDataActions.addLine(formData));
        navigate(ROUTES.home);
      })
      .catch(parseErrors);
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
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && (
            <p className={styles.errorMessage}>{errors.gender}</p>
          )}
        </label>
        <ImageInput ref={formRefs.image} setImageData={setImageData} />

        <CountryInput ref={formRefs.country} />
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

export default UncontrolledForm;
