import * as yup from 'yup';
import { FormDataLine } from '../../../types';

const schema = yup.object<FormDataLine>().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Za-z0-9\s]+$/, 'Only Latin letters')
    .matches(/^[A-Z]/, 'The name needs to be capitalized'),
  age: yup
    .number()
    .required('Age is required')
    .typeError('Age must be a number')
    .positive('Age must be greater than zero'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address')
    .matches(
      /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
      'Invalid email format or missing domain'
    )
    .matches(
      /^[\w!#$%&'*+\-/=?^_`{|}~]+(?:\.[\w!#$%&'*+\-/=?^_`{|}~]+)*@[\w-]+(?:\.[\w-]+)*(?:\.[a-zA-Z]{2,})?$/,
      'Invalid local-part format'
    ),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^[a-zA-Z0-9!@#$%^&*]*$/,
      'Password must only contain Latin symbols, digits, and special characters'
    )
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(
      /[!@#$%^&*]/,
      'Password must contain at least one special character'
    )
    .matches(/^\S*$/, 'Password must not contain whitespace'),
  passwordConfirm: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  acceptTC: yup
    .boolean()
    .required('You must accept T&C')
    .isTrue('You must accept T&C'),
  country: yup.string().required('Country is required'),
  image: yup.string().required('Image is required'),
  gender: yup.string().required('Gender is required'),
});

export default schema;
