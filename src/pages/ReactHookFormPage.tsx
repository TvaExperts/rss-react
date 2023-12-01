import React from 'react';
import { useAppDispatch } from '../hooks/redux';
import { formsStoreSliceActions } from '../reducers/FormsDataStoreSlice';
import { Countries, FormDataLine, FormType, GendersType } from '../types';

function ReactHookFormPage() {
  const dispatch = useAppDispatch();
  function onClick() {
    const dataLine: FormDataLine = {
      name: 'Name',
      age: 22,
      picture: 'fdf',
      email: 'sd',
      password: 'sad',
      gender: GendersType.female,
      formType: FormType.reactHook,
      date: new Date().toLocaleTimeString(),
      country: Countries.Argentina,
    };

    dispatch(formsStoreSliceActions.addLine(dataLine));
  }

  return (
    <div>
      <h1>React Hook Form Page</h1>
      <button type="button" onClick={onClick}>
        Add line
      </button>
    </div>
  );
}

export default ReactHookFormPage;
