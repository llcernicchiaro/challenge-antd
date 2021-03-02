import type { Effect, Reducer } from 'umi';

import { queryProducts, queryCategories } from '@/services/products';

export type Product = {
  id: number;
  idCategory: number;
  image: string;
  name: string;
  description: string;
  price: number;
};

export type Category = {
  id: number;
  name: string;
};

export type ProductModelState = {
  products?: Product[];
  categories?: Category[];
};

export type ProductModelType = {
  namespace: 'product';
  state: ProductModelState;
  effects: {
    fetchProducts: Effect;
    fetchCategories: Effect;
  };
  reducers: {
    saveProducts: Reducer<ProductModelState>;
    saveCategories: Reducer<ProductModelState>;
  };
};

const UserModel: ProductModelType = {
  namespace: 'product',
  state: {
    products: [],
    categories: [],
  },
  effects: {
    *fetchProducts(_, { call, put }) {
      const response = yield call(queryProducts);

      yield put({
        type: 'saveProducts',
        payload: response,
      });
    },
    *fetchCategories(_, { call, put }) {
      const response = yield call(queryCategories);

      yield put({
        type: 'saveCategories',
        payload: response,
      });
    },
  },
  reducers: {
    saveProducts(state, action) {
      return {
        ...state,
        products: action.payload || [],
      };
    },
    saveCategories(state, action) {
      return {
        ...state,
        categories: action.payload || [],
      };
    },
  },
};

export default UserModel;
