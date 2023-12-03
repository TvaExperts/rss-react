import * as yup from 'yup';
import { FormDataInputs } from '../../../types';
import { COUNTRIES } from '../../../data/countries';

const schema = yup.object<FormDataInputs>().shape({
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
  acceptTC: yup.boolean().oneOf([true], 'You must accept T&C'),
  country: yup
    .string()
    .required('Country is required')
    .test(
      'Country in the list of countries',
      'Select a country from the list',
      (country) => COUNTRIES.includes(country)
    ),
  imageFile: yup
    .mixed<FileList>()
    .test('Validate file existing', 'Please load image', (file) => {
      if (!file) return false;
      if (file instanceof File) {
        return true;
      }
      return file.length > 0;
    })
    .test('Validate size of image', 'Big size of image (more 4 MB)', (file) => {
      if (file instanceof File) {
        return file && file.size <= 4 * 1024 * 1024;
      }
      return file && file[0] && file[0].size <= 4 * 1024 * 1024;
    })
    .test('File format', 'we support .PNG and .JPEG files', (file) => {
      if (!file) return false;
      if (file instanceof File) {
        return (
          file.type.includes('png') ||
          file.type.includes('jpeg') ||
          file.type.includes('jpg')
        );
      }
      return (
        file &&
        file[0] &&
        (file[0].type.includes('png') ||
          file[0].type.includes('jpeg') ||
          file[0].type.includes('jpg'))
      );
    }),

  gender: yup.string().required('Gender is required'),
});

export default schema;
