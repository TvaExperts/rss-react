import { Product } from '../types';
import { ProductsApiResponse } from '../services/api';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../constants/searchParams';
import { SEARCH_PARAMETERS } from '../routs/searchParameters';

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
  setSearchParamsFromUrl = 'setSearchParamsFromUrl',
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
    }
  | {
      type: ActionTypes.setSearchParamsFromUrl;
      payload: URLSearchParams;
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
    case ActionTypes.setSearchParamsFromUrl: {
      const searchParams = action.payload;
      const newState = { ...state };

      if (searchParams.get(SEARCH_PARAMETERS.query) !== null) {
        newState.query = searchParams.get(SEARCH_PARAMETERS.query) || '';
      }

      if (searchParams.get(SEARCH_PARAMETERS.limit)) {
        newState.limit =
          Number(searchParams.get(SEARCH_PARAMETERS.limit)) || DEFAULT_LIMIT;
      } else {
        newState.limit = DEFAULT_LIMIT;
      }

      if (searchParams.get(SEARCH_PARAMETERS.offset)) {
        newState.offset =
          Number(searchParams.get(SEARCH_PARAMETERS.offset)) || DEFAULT_OFFSET;
      } else {
        newState.offset = DEFAULT_OFFSET;
      }

      if (searchParams.get(SEARCH_PARAMETERS.offset) !== null) {
        newState.offset =
          Number(searchParams.get(SEARCH_PARAMETERS.offset)) || DEFAULT_OFFSET;
      }
      return newState;
    }
    default:
      return state;
  }
}

export { appReducer, ActionTypes };
export type { AppState, AppActions };
