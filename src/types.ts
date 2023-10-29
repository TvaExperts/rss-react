type ShowData = {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
};

enum TEXTS {
  INPUT_PLACEHOLDER = 'Поиск по фильмам и сериалам',
  BUTTON_FIND = 'Поиск',
  BUTTON_ERROR = 'Сломать',
}

export type { ShowData };
export { TEXTS };
