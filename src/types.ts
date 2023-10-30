type ShowData = {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
};

enum TEXTS {
  INPUT_PLACEHOLDER = 'Search by movies and TV shows',
  BUTTON_FIND = 'Search',
  BUTTON_FIND_LOADING = 'Loading...',
  NO_CHANGES = 'The request has not changed',
  ERROR_TEXT = 'Something went wrong!',
  MAIN_LOADING = 'Loading data...',
  NOT_FOUND = 'Nothing was found, make another request',
}

export type { ShowData };
export { TEXTS };
