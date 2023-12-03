import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css';
import { FormDataLine } from '../../types';
import schema from './resolvers/schema';
import { useAppDispatch } from '../../hooks/redux';
import { formsDataActions } from '../../reducers/FormsDataSlice';
import ROUTES from '../../router/routes';

function ReactHookForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLine>({
    mode: 'onChange',
    resolver: yupResolver<FormDataLine>(schema),
  });

  const onSubmit: SubmitHandler<FormDataLine> = (data) => {
    dispatch(formsDataActions.addLine(data));
    navigate(ROUTES.home);
  };

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
      {/* <ImageInput ref={formRefs.image} setImageData={setImageData} /> */}

      <label htmlFor="image">
        Image:
        <input {...register('image')} type="file" id="image" name="image" />
        {errors.image && (
          <p className={styles.errorMessage}>{errors.image.message}</p>
        )}
      </label>

      {/* <CountryInput ref={formRefs.country} /> */}
      <label htmlFor="country">
        Country:
        <input
          {...register('country')}
          type="text"
          placeholder="Select your country..."
          id="country"
          name="country"
        />
        {errors.country && (
          <p className={styles.errorMessage}>{errors.country.message}</p>
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

      <button type="submit">Submit</button>
    </form>
  );
}

export default ReactHookForm;
