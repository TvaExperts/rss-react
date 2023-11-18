import { http, HttpResponse } from 'msw';
import { mockProduct } from './mockProduct';
import { mockArrOf30Products } from './mockArrOf30Products';
import { BASE_URL } from '../../services/api';

export const handlers = [
  http.get(`${BASE_URL}/search`, () => {
    return HttpResponse.json({ total: 30, products: mockArrOf30Products });
  }),
  http.get(`${BASE_URL}/*`, () => {
    return HttpResponse.json(mockProduct);
  }),
];
