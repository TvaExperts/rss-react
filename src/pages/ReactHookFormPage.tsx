import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { formsDataActions } from '../reducers/FormsDataSlice';
import { FormDataLine, FormType, GendersType } from '../types';
import ROUTES from '../router/routes';

function ReactHookFormPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
      country: 'Togo',
    };

    dispatch(formsDataActions.addLine(dataLine));
    navigate(ROUTES.home);
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
