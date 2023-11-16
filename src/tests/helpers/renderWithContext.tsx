import React, { isValidElement } from 'react';
import { render } from '@testing-library/react';
import { AppActions } from '../../reducers/appReducer';

import { AppContext } from '../../context/AppProvider';
import { initialState } from '../mocks/mockInitialState';

export function renderWithContext(component: React.ReactNode) {
  if (!isValidElement(component)) throw new Error('Invalid React Element');
  const mockDispatch: React.Dispatch<AppActions> = () => null;
  const value = { state: initialState, dispatch: mockDispatch };

  return render(
    <AppContext.Provider value={value}>{component}</AppContext.Provider>
  );
}
