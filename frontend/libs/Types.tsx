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
  cart: Cart;
  favorites: Favorite[];
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

export type Cart = {
  id: number;
  user: User;
  createdAt: string;
  updatedAt: string;
  cartProducts: CartProduct[];
};

export type CartProduct = {
  id: number;
  product: Product;
  quantity: number;
  cart: Cart;
  createdAt: string;
  updatedAt: string;
};

export type PaymentResult = {
  paymentIntent?: {
    id: string;
    status: string;
  };
  error?: {
    message: string;
  };
};

export type Order = {
  id: number;
  user: User;
  status: string;
  shippingAddress: string;
  phoneNumber: string;
  orderItemList: OrderItem[];
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  id: number;
  order: Order;
  product: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type Favorite = {
  id: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
};
