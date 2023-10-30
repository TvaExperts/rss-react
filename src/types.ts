type ShowData = {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
};

enum TEXTS {
  INPUT_PLACEHOLDER = 'Search by movies and TV series',
  BUTTON_FIND = 'Search',
  BUTTON_FIND_LOADING = 'Loading...',
  BUTTON_ERROR = 'Break',
  ERROR_TEXT = 'Something went wrong!',
  MAIN_LOADING = 'Loading data...',
  NOT_FOUND = 'Nothing was found, make another request',
}

export type { ShowData };
export { TEXTS };
