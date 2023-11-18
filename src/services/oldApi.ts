import axios from 'axios';
import { Product } from '../types';
import { DEFAULT_LIMIT } from '../constants/searchParams';

type ProductsApiResponse = {
  total: number;
  products: Product[];
};

type ProductApiResponse = {
  data: Product;
};

const API_URL = 'fsd';

function createSearchParamsPartURL(
  limit?: number,
  page?: number,
  query?: string
) {
  const searchParams = new URLSearchParams();

  if (limit !== undefined) searchParams.set('limit', limit.toString());
  if (page !== undefined)
    searchParams.set(
      'skip',
      ((page - 1) * (limit || DEFAULT_LIMIT)).toString()
    );
  if (query?.length) searchParams.set('q', query);

  return searchParams.size ? `${searchParams.toString()}` : '';
}

async function getProductsFromApi(
  query?: string,
  limit?: number,
  page?: number
): Promise<ProductsApiResponse> {
  try {
    const searchParamsPartURL = createSearchParamsPartURL(limit, page, query);

    const requestUrl = query
      ? `${API_URL}/search?${searchParamsPartURL}`
      : `${API_URL}?${searchParamsPartURL}`;

    const response = await axios.get(requestUrl);

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

function getProductPromise(id: string): Promise<ProductApiResponse> {
  return axios.get(`${API_URL}/${id}`);
}

export { getProductsFromApi, getProductPromise };
export type { ProductApiResponse, ProductsApiResponse };
