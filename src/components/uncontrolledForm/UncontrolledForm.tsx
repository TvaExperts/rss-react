import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CountryInput } from 'components';
import { useAppDispatch } from '../../hooks/redux';
import { FormDataLine, FormType, GendersType } from '../../types';
import { formsDataActions } from '../../reducers/FormsDataSlice';
import ROUTES from '../../router/routes';
import styles from './UncontrolledForm.module.css';

function UncontrolledForm() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const formRefs = {
    name: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    passwordConfirm: useRef<HTMLInputElement>(null),
    gender: useRef<HTMLSelectElement>(null),
    acceptTC: useRef<HTMLInputElement>(null),
    country: React.createRef<HTMLInputElement>(),
  };

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dataLine: FormDataLine = {
      name: formRefs.name?.current?.value || 'Noname',
      age: Number(formRefs.age?.current?.value) || 0,
      picture: 'picture',
      email: formRefs.email?.current?.value || 'temp@gmail.com',
      password: formRefs.password?.current?.value || 'password',
      gender: GendersType.male,
      formType: FormType.uncontrolled,
      date: new Date().toLocaleTimeString(),
      country: formRefs.country?.current?.value || 'Mali',
    };

    dispatch(formsDataActions.addLine(dataLine));
    navigate(ROUTES.home);
  }

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <label htmlFor="name">
          Name:
          <input type="text" name="name" id="name" ref={formRefs.name} />
        </label>
        <label htmlFor="age">
          Age:
          <input type="number" name="age" id="age" ref={formRefs.age} />
        </label>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" id="email" ref={formRefs.email} />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            ref={formRefs.password}
          />
        </label>
        <label htmlFor="passwordConfirm">
          Password Confirmation:
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            ref={formRefs.passwordConfirm}
          />
        </label>
        <label htmlFor="gender">
          Gender:
          <select ref={formRefs.gender}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>
        <CountryInput ref={formRefs.country} />
        <label htmlFor="acceptTC">
          Accept T&C:
          <input
            type="checkbox"
            name="acceptTC"
            id="acceptTC"
            ref={formRefs.acceptTC}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UncontrolledForm;
