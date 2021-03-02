import type { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import type { CartModelState } from './cart';
import type { ProductModelState } from './product';
import type { GlobalModelState } from './global';

export { GlobalModelState, UserModelState };

export type Loading = {
  global: boolean;
  effects: Record<string, boolean | undefined>;
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    product?: boolean;
    cart?: boolean;
  };
};

export type ConnectState = {
  global: GlobalModelState;
  loading: Loading;
  settings: ProSettings;
  product: ProductModelState;
  cart: CartModelState;
};

export type Route = {
  routes?: Route[];
} & MenuDataItem;
