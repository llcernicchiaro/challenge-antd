import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { connect } from 'umi';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import type { CartItem, Dispatch } from 'umi';
import type { ConnectState } from '@/models/connect';

interface ListItemActionProps {
  dispatch: Dispatch;
  id: number;
  cart: CartItem[];
}

const ListItemAction: React.FC<ListItemActionProps> = (props) => {
  const { cart, dispatch, id } = props;
  const [isProductOnCart, setIsProductOnCart] = useState(false);
  const [itemAmount, setItemAmount] = useState(0);

  useEffect(() => {
    setIsProductOnCart(cart.some((item) => item.id === id));
    setItemAmount(cart.find((item) => item.id === id)?.amount || 0);
  }, [cart, id]);

  const addToCart = () => {
    // if(!cart.length) dispatch({cart})
    dispatch({ type: 'cart/addToCart', payload: { id } });
  };

  const increaseAmount = () => {
    dispatch({ type: 'cart/increaseAmount', payload: { id } });
  };

  const decreaseAmount = () => {
    if (itemAmount > 1) dispatch({ type: 'cart/decreaseAmount', payload: { id } });
    else dispatch({ type: 'cart/removeFromCartEffect', payload: { cart, id } });
  };

  return isProductOnCart ? (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button type="text" icon={<MinusOutlined />} onClick={decreaseAmount} />
      <strong style={{ color: 'black', fontSize: 20 }}>{itemAmount}</strong>
      <Button type="text" icon={<PlusOutlined />} onClick={increaseAmount} />
    </div>
  ) : (
    <Button type="primary" onClick={addToCart}>
      Adicionar no carrinho
    </Button>
  );
};

export default connect(({ cart }: ConnectState) => ({ cart: cart.cart || [] }))(ListItemAction);
