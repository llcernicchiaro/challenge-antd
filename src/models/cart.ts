import { Modal } from 'antd';
import { history } from 'umi';
import type { Effect, Reducer } from 'umi';

export type CartItem = {
  id: number;
  amount: number;
};

export type CartModelState = {
  cart?: CartItem[];
};

export type CartModelType = {
  namespace: 'cart';
  state: CartModelState;
  effects: {
    removeFromCartEffect: Effect;
  };
  reducers: {
    addToCart: Reducer<CartModelState>;
    removeFromCart: Reducer<CartModelState>;
    increaseAmount: Reducer<CartModelState>;
    decreaseAmount: Reducer<CartModelState>;
    clearCart: Reducer<CartModelState>;
  };
};

const UserModel: CartModelType = {
  namespace: 'cart',
  state: {
    cart: [],
  },
  effects: {
    *removeFromCartEffect({ payload }, { put }) {
      if (payload.cart.length === 1 && window.location.pathname === '/carrinho') {
        Modal.info({
          title: 'Seu carrinho ficou vazio!',
          content: 'Você será redirecionado para a home.',
          onOk: () => history.push('/'),
        });
      }
      yield put({
        type: 'removeFromCart',
        payload: { id: payload.id },
      });
    },
  },
  reducers: {
    addToCart(state, { payload }): CartModelState {
      const { id } = payload;
      return {
        ...state,
        cart: state?.cart?.concat({ id, amount: 1 }),
      };
    },
    removeFromCart(state, { payload }): CartModelState {
      const { id } = payload;
      return {
        ...state,
        cart: state?.cart?.filter((item) => item.id !== id),
      };
    },
    increaseAmount(state, { payload }): CartModelState {
      const { id } = payload;
      return {
        ...state,
        cart: state?.cart?.map((item) =>
          item.id === id ? { ...item, amount: item.amount + 1 } : item,
        ),
      };
    },
    decreaseAmount(state, { payload }): CartModelState {
      const { id } = payload;
      return {
        ...state,
        cart: state?.cart?.map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item,
        ),
      };
    },
    clearCart(state): CartModelState {
      return {
        ...state,
        cart: [],
      };
    },
  },
};

export default UserModel;
