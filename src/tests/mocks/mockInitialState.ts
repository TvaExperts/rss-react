import { AppState } from '../../reducers/appReducer';
import { mockArrOf10Products } from './mockArrOf10Products';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../../constants/searchParams';

export const initialState: AppState = {
  total: 10,
  products: mockArrOf10Products,
  query: '',
  limit: DEFAULT_LIMIT,
  offset: DEFAULT_OFFSET,
};
