import { render } from '@testing-library/react';
import { Fallback } from './Fallback';

describe('Fallback tests', () => {
  it('Verify that Fallback rendering successful', async () => {
    render(<Fallback />);
  });
});
