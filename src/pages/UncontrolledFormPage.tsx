import React from 'react';
import { useAppDispatch } from '../hooks/redux';
import { Countries, FormDataLine, FormType, GendersType } from '../types';
import { formsStoreSliceActions } from '../reducers/FormsDataStoreSlice';

function UncontrolledFormPage() {
  const dispatch = useAppDispatch();
  function onClick() {
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

    dispatch(formsStoreSliceActions.addLine(dataLine));
  }
  return (
    <div>
      <h1>Uncontrolled Form Page</h1>
      <button type="button" onClick={onClick}>
        Add line
      </button>
    </div>
  );
}

export default UncontrolledFormPage;
