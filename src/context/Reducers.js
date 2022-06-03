export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, { ...action.payload, qty: 1 }];
    case "REMOVE_FROM_CART":
      const newCart = state.filter((item) => item.id !== action.payload.id);
      return newCart;
    case "CHANGE_QUANTITY":
      const quantityCart = state.map((item) => {
        if (item.id === action.payload.item.id)
          return { ...action.payload.item, qty: action.payload.qty };
        return item;
      });
      return quantityCart;
    default:
      return state;
  }
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "OUT_OF_STOCK":
      return { ...state, outofstock: action.payload };
    case "FAST_DELIVERY":
      return { ...state, fastDelivery: action.payload };
    case "RATING":
      return { ...state, rating: action.payload };
    case "SEARCH":
      return { ...state, search: action.payload };
    case "CLEAR_FILTER":
      return {
        ...state,
        sort: "",
        outofstock: false,
        fastDelivery: false,
        rating: 0,
      };
    default:
      return state;
  }
};
