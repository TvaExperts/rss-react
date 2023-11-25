import axios from 'axios';

import IProduct from '../models/IProduct';
import { AppSearchParams } from '../reducers/ParamsSlice';

const API_URL = 'https://dummyjson.com/products';

type ProductsApiResponse = {
  total: number;
  products: IProduct[];
};

type ProductApiResponse = {
  data: IProduct;
};

function createSearchParamsPartURL(appSearchParams: AppSearchParams) {
  const { limit, page, text } = appSearchParams;

  const searchParams = new URLSearchParams();
  searchParams.set('limit', limit.toString());
  searchParams.set('skip', ((page - 1) * page).toString());
  searchParams.set('q', text || '');

  return searchParams.toString();
}

async function getProductsFromApi(
  appSearchParams: AppSearchParams
): Promise<ProductsApiResponse> {
  try {
    const searchParamsPartURL = createSearchParamsPartURL(appSearchParams);

    const requestUrl = `${API_URL}/search?${searchParamsPartURL}`;

    const response = await axios.get(requestUrl);

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function getProductById(id: string): Promise<ProductApiResponse> {
  try {
    return axios.get(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export { getProductsFromApi, getProductById };
export type { ProductApiResponse, ProductsApiResponse };
