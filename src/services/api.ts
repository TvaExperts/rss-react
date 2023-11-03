import axios from 'axios';
import { Product } from '../types';

const API_URL = 'https://dummyjson.com/products';

type ProductApiResponse = {
  products: Product[];
};

function processData(responseData: ProductApiResponse): Product[] {
  return responseData.products.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    images: item.images,
  }));
}

function createSearchParamsPartURL(
  limit?: number,
  offset?: number,
  query?: string
) {
  const searchParams = new URLSearchParams();

  if (limit !== undefined) searchParams.set('limit', limit.toString());
  if (offset !== undefined) searchParams.set('skip', offset.toString());
  if (query?.length) searchParams.set('q', query);

  return searchParams.size ? `?${searchParams.toString()}` : '';
}

async function getProductsFromApi(
  query?: string,
  limit?: number,
  offset?: number
): Promise<Product[]> {
  try {
    const searchParamsPartURL = createSearchParamsPartURL(limit, offset, query);

    const requestUrl = query
      ? `${API_URL}/search${searchParamsPartURL}`
      : `${API_URL}${searchParamsPartURL}`;

    const response = await axios.get(requestUrl);

    return processData(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export { getProductsFromApi };
