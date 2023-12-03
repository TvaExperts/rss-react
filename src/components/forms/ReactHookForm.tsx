import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './Form.module.css';
import { FormDataLine } from '../../types';

export interface ReactFormInputs extends FormDataLine {
  passwordConfirm: string;
  acceptTC: boolean;
}

function ReactHookForm() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<ReactFormInputs>();
  const onSubmit: SubmitHandler<ReactFormInputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label htmlFor="name">
        Name:
        <input {...register('name')} type="text" name="name" id="name" />
      </label>
      <label htmlFor="age">
        Age:
        <input {...register('age')} type="number" name="age" id="age" />
      </label>
      <label htmlFor="email">
        Email:
        <input {...register('email')} type="email" name="email" id="email" />
      </label>
      <label htmlFor="password">
        Password:
        <input
          {...register('password')}
          type="password"
          name="password"
          id="password"
        />
      </label>
      <label htmlFor="passwordConfirm">
        Password Confirmation:
        <input
          {...register('passwordConfirm')}
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
        />
      </label>
      <label htmlFor="gender">
        Gender:
        <select {...register('gender')}>
          <option>Male</option>
          <option>Female</option>
        </select>
      </label>
      {/* <ImageInput ref={formRefs.image} setImageData={setImageData} /> */}

      {/* <CountryInput ref={formRefs.country} /> */}
      <label htmlFor="acceptTC">
        Accept T&C:
        <input
          {...register('acceptTC')}
          type="checkbox"
          name="acceptTC"
          id="acceptTC"
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default ReactHookForm;
