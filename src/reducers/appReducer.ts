import { Product } from '../types';
import { ProductsApiResponse } from '../services/api';
import { DEFAULT_LIMIT } from '../constants/searchParams';
import { SEARCH_PARAMETERS } from '../routs/searchParameters';

type AppState = {
  products: Product[];
  total: number;
  query: string;
  limit: number;
  page: number;
};

enum ActionTypes {
  setProducts = 'addProducts',
  setQuery = 'addQuery',
  changeLimit = 'changeLimit',
  changePage = 'changePage',
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
      type: ActionTypes.changeLimit | ActionTypes.changePage;
      payload: number;
    }
  | {
      type: ActionTypes.setSearchParamsFromUrl;
      payload: URLSearchParams;
    };

function appReducer(state: AppState, action: AppActions) {
  switch (action.type) {
    case ActionTypes.setQuery: {
      return { ...state, query: action.payload, page: 1 };
    }
    case ActionTypes.setProducts: {
      const { products, total } = action.payload;
      return { ...state, products, total };
    }
    case ActionTypes.changePage: {
      return { ...state, page: action.payload };
    }
    case ActionTypes.changeLimit: {
      return { ...state, limit: action.payload, page: 1 };
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

      if (searchParams.get(SEARCH_PARAMETERS.page)) {
        newState.page = Number(searchParams.get(SEARCH_PARAMETERS.page)) || 1;
      } else {
        newState.page = 1;
      }

      return newState;
    }
    default:
      return state;
  }
}

export { appReducer, ActionTypes };
export type { AppState, AppActions };
