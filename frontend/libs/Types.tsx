export type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  role: string;
  provider: string;
};

export type Category = {
  id: number;
  name: string;
}

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
}