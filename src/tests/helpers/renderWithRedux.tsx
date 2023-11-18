import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { setupStore } from '../../store';

export function renderWithRedux(component: React.ReactNode, initialState = {}) {
  const store = setupStore(initialState);

  return render(<Provider store={store}>{component}</Provider>);
}
