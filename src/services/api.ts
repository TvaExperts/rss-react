import { DataItem } from '../types';

const URL =
  'https://world.openfoodfacts.net/api/v2/search?brands_tags=Nutella&fields=code%2Cproduct_name';

async function getDataFromApi(query: string) {
  const newArray: DataItem[] = [{ name: query, age: query.length }];
  const res = await fetch(URL, { mode: 'no-cors' });
  const data = await res.json();
  console.log(data);
  return newArray;
}

export { getDataFromApi };
