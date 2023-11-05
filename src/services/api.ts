import axios from 'axios';
import { Product } from '../types';

const API_URL = 'https://dummyjson.com/products';

type ProductsApiResponse = {
  total: number;
  products: Product[];
};

type ProductApiResponse = {
  data: Product;
};

function createSearchParamsPartURL(
  limit?: string,
  offset?: string,
  query?: string
) {
  const searchParams = new URLSearchParams();

  if (limit !== undefined) searchParams.set('limit', limit);
  if (offset !== undefined) searchParams.set('skip', offset);
  if (query?.length) searchParams.set('q', query);

  return searchParams.size ? `?${searchParams.toString()}` : '';
}

async function getProductsFromApi(
  query?: string,
  limit?: string,
  offset?: string
): Promise<ProductsApiResponse> {
  try {
    const searchParamsPartURL = createSearchParamsPartURL(limit, offset, query);

    const requestUrl = query
      ? `${API_URL}/search${searchParamsPartURL}`
      : `${API_URL}${searchParamsPartURL}`;
    const response = await axios.get(requestUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

function getProductPromise(id: string): Promise<ProductApiResponse> {
  try {
    return axios.get(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export { getProductsFromApi, getProductPromise };
export type { ProductApiResponse };
