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

function createRequest(query: string): MyShowsRequest {
  return {
    jsonrpc: '2.0',
    method: 'shows.Search',
    params: {
      query,
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

async function getDataFromApi(query: string): Promise<ShowData[]> {
  try {
    const request = createRequest(query);
    const response = await axios.post(API_URL, request);
    return processData(response.data.result);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export { getDataFromApi };
