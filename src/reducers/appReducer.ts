import { Product } from '../types';
import { ProductsApiResponse } from '../services/api';
import { DEFAULT_OFFSET } from '../constants/searchParams';

type AppState = {
  products: Product[];
  total: number;
  query: string;
  limit: number;
  offset: number;
};

enum ActionTypes {
  setProducts = 'addProducts',
  setQuery = 'addQuery',
  changeLimit = 'changeLimit',
  changeOffset = 'changeOffset',
}

type AppActions =
  | {
      type: ActionTypes.setProducts;
      payload: ProductsApiResponse;
    }
  | {
      type: ActionTypes.setQuery;
      payload: string;
    }
  | {
      type: ActionTypes.changeLimit | ActionTypes.changeOffset;
      payload: number;
    };

function appReducer(state: AppState, action: AppActions) {
  switch (action.type) {
    case ActionTypes.setQuery: {
      return { ...state, query: action.payload, offset: DEFAULT_OFFSET };
    }
    case ActionTypes.setProducts: {
      const { products, total } = action.payload;
      return { ...state, products, total };
    }
    case ActionTypes.changeOffset: {
      return { ...state, offset: action.payload };
    }
    case ActionTypes.changeLimit: {
      return { ...state, limit: action.payload, offset: DEFAULT_OFFSET };
    }
    default:
      return state;
  }
}

export { appReducer, ActionTypes };
export type { AppState, AppActions };
