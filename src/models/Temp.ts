export type TODO = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type ProductsApiResponse = {
  total: number;
  products: TODO[];
};
