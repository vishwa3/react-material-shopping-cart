import React, { createContext, useContext, useReducer } from "react";
import faker from "@faker-js/faker";
import { cartReducer, filterReducer } from "./Reducers";

const Cart = createContext();

const CartContext = ({ children }) => {
  faker.seed(99);
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.random.image(),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [cart, cartDispatch] = useReducer(cartReducer, []);
  const initialFilterState = {
    sort: "",
    outofstock: false,
    fastDelivery: false,
    rating: 0,
    search: "",
  };

  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initialFilterState
  );

  return (
    <Cart.Provider
      value={{ cart, cartDispatch, products, filterState, filterDispatch }}
    >
      {children}
    </Cart.Provider>
  );
};

export default CartContext;

export const CartState = () => {
  return useContext(Cart);
};
