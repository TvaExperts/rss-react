type ShowData = {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
};

enum TEXTS {
  INPUT_PLACEHOLDER = 'Поиск по фильмам и сериалам',
  BUTTON_FIND = 'Поиск',
  BUTTON_FIND_LOADING = 'Загрузка...',
  BUTTON_ERROR = 'Сломать',
  ERROR_TEXT = 'Все печально!',
}

export type { ShowData };
export { TEXTS };
