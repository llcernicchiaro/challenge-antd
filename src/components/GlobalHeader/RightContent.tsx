import { Popover, Button, Badge } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import type { Dispatch, CartItem } from 'umi';
import { ShoppingCartOutlined } from '@ant-design/icons';
import type { ConnectState } from '@/models/connect';
import type { Product } from '@/models/product';
import styles from './index.less';
import ProductList from '../ProductList';

export type GlobalHeaderRightProps = {
  dispatch: Dispatch;
  products: Product[];
  cart: CartItem[];
};

const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = (props) => {
  const { cart, products } = props;

  return (
    <div>
      <Popover
        content={
          <ProductList
            products={products.filter((product) => cart.some(({ id }) => id === product.id))}
          />
        }
        placement="bottomRight"
        className={styles.button}
      >
        <Button
          type="text"
          size="large"
          onClick={() => history.push('/carrinho')}
          icon={
            <Badge count={cart.length} size="small">
              <ShoppingCartOutlined />
            </Badge>
          }
        />
      </Popover>
    </div>
  );
};

export default connect(({ cart, product }: ConnectState) => ({
  cart: cart.cart || [],
  products: product.products || [],
}))(GlobalHeaderRight);
