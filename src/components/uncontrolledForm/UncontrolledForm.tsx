import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { Countries, FormDataLine, FormType, GendersType } from '../../types';
import { formsDataActions } from '../../reducers/FormsDataSlice';
import ROUTES from '../../router/routes';
import styles from './UncontrolledForm.module.css';

function UncontrolledForm() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  function onSubmit() {
    const dataLine: FormDataLine = {
      name: 'Name',
      age: 22,
      picture: 'fdf',
      email: 'sd',
      password: 'sad',
      gender: GendersType.male,
      formType: FormType.uncontrolled,
      date: new Date().toLocaleTimeString(),
      country: Countries.Argentina,
    };

    dispatch(formsDataActions.addLine(dataLine));
    navigate(ROUTES.home);
  }

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const acceptTCRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <label htmlFor="name">
          Name:
          <input type="text" name="name" id="name" ref={nameRef} />
        </label>
        <label htmlFor="age">
          Age:
          <input type="number" name="age" id="age" ref={ageRef} />
        </label>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" id="email" ref={emailRef} />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
          />
        </label>
        <label htmlFor="passwordConfirm">
          Password Confirmation:
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            ref={passwordConfirmRef}
          />
        </label>
        <label htmlFor="gender">
          Gender:
          <select ref={genderRef}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>
        <label htmlFor="country">
          Country:
          <input type="text" name="country" id="country" ref={countryRef} />
        </label>
        <label htmlFor="acceptTC">
          Accept T&C:
          <input
            type="checkbox"
            name="acceptTC"
            id="acceptTC"
            ref={acceptTCRef}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UncontrolledForm;
