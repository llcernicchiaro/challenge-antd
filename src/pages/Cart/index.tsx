import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Result, Modal, Typography } from 'antd';
import { connect, history } from 'umi';
import type { CartItem, Dispatch } from 'umi';
import type { ConnectState } from '@/models/connect';
import type { Product } from '@/models/product';
import ProductList from '@/components/ProductList';
// import styles from './index.less';

export interface HomeProps {
  dispatch: Dispatch;
  products: Product[];
  cart: CartItem[];
  loadingProducts?: boolean;
}

const HomePage: React.FC<HomeProps> = (props) => {
  const { cart, dispatch, products, loadingProducts } = props;
  const [productsOnCart, setProductsOnCart] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showFinishModal, setShowFinishModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch({ type: 'product/fetchProducts' });
  }, [dispatch]);

  useEffect(() => {
    setProductsOnCart(products.filter((product) => cart.some(({ id }) => id === product.id)));
  }, [cart, products]);

  useEffect(() => {
    setTotalPrice(
      productsOnCart.reduce(
        (sum, product) =>
          sum + product.price * (cart.find((item) => item.id === product.id)?.amount || 1),
        0,
      ),
    );
  }, [cart, productsOnCart]);

  const finishPurchase = () => {
    dispatch({ type: 'cart/clearCart' });
    setShowFinishModal(false);
    history.push('/');
  };

  return (
    <PageHeaderWrapper>
      <Typography.Title level={1}>Finalizar pedido</Typography.Title>
      <Typography.Title level={4}>Revise seus itens</Typography.Title>
      <ProductList loading={loadingProducts} products={productsOnCart} />
      <div style={{ textAlign: 'right' }}>
        <Typography.Title level={4}>
          Total: {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Typography.Title>
        <Button type="primary" onClick={() => setShowFinishModal(true)}>
          Finalizar compra
        </Button>
      </div>
      <Modal visible={showFinishModal} footer={false} closable={false} centered>
        <Result
          status="success"
          title="Compra realizada com sucesso!"
          extra={[
            <Button type="primary" onClick={finishPurchase}>
              Fechar
            </Button>,
          ]}
        />
      </Modal>
    </PageHeaderWrapper>
  );
};

export default connect(({ cart, loading, product }: ConnectState) => ({
  loadingProducts: loading.effects['product/fetchProducts'],
  products: product.products || [],
  cart: cart.cart || [],
}))(HomePage);
