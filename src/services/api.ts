import axios from 'axios';

const URL = 'https://api.myshows.me/v2/rpc/';

type ApiResponse = {
  id: number;
  title: string;
  description: string;
};

function createBody(query: string) {
  return {
    jsonrpc: '2.0',
    method: 'shows.Search',
    params: {
      query,
    },
    id: 1,
  };
}

async function getDataFromApi(query: string) {
  const response = await axios.post(URL, createBody(query));

  return response.data.result.map((item: ApiResponse) => {
    return {
      id: item.id,
      name: item.title,
      description: item.description,
    };
  });
}

export { getDataFromApi };
