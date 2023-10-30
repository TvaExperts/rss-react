import axios from 'axios';
import { ShowData } from '../types';

const API_URL = 'https://api.myshows.me/v2/rpc/';

type MyShowsResponse = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type MyShowsRequest = {
  jsonrpc: string;
  method: string;
  params: {
    query: string;
  };
  id: number;
};

function createFindRequest(query: string): MyShowsRequest {
  return {
    jsonrpc: '2.0',
    method: 'shows.Search',
    params: {
      query,
    },
    id: 1,
  };
}

function createTopShowsRequest() {
  return {
    jsonrpc: '2.0',
    method: 'shows.Get',
    params: {
      search: {
        network: 0,
        genre: 0,
        country: 'string',
        category: 'string',
        status: 'string',
        sort: 'string',
        query: '*',
      },
      page: 0,
      pageSize: 10,
    },
    id: 1,
  };
}

function processData(responseData: MyShowsResponse[]): ShowData[] {
  return responseData.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    imgUrl: item.image,
  }));
}

async function getShowsDataFromApi(query: string): Promise<ShowData[]> {
  try {
    const request = query ? createFindRequest(query) : createTopShowsRequest();
    const response = await axios.post(API_URL, request);
    return processData(response.data.result);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export { getShowsDataFromApi };
