import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { Countries, FormDataLine, FormType, GendersType } from '../../types';
import { formsDataActions } from '../../reducers/FormsDataSlice';
import ROUTES from '../../router/routes';

function UncontrolledForm() {
  const navigate = useNavigate();

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

    dispatch(formsDataActions.addLine(dataLine));
    navigate(ROUTES.home);
  }
  return (
    <div>
      <p>AAA</p>

      <button type="button" onClick={onClick}>
        Add line
      </button>
    </div>
  );
}

export default UncontrolledForm;
