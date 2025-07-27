export type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  role: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
  reviews: Review[];
};

export type Review = {
  id: number;
  rating: number;
  review: string;
  user: User;
  createdAt: string;
  updatedAt: string;
};
