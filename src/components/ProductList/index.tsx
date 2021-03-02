import React from 'react';
import { Avatar, List, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import type { Product } from '@/models/product';
import type { PaginationConfig } from 'antd/lib/pagination';
import styles from './index.less';
import ListItemAction from '../ListItemAction';

export interface ProductsListProps {
  loading?: boolean;
  products: Product[];
  pagination?: PaginationConfig;
}

const ProductList: React.FC<ProductsListProps> = (props) => {
  const { loading, pagination, products } = props;

  return (
    <List
      itemLayout="vertical"
      className={styles.list}
      loading={loading}
      dataSource={products}
      pagination={pagination}
      locale={{
        emptyText: (
          <div>
            <ShoppingCartOutlined style={{ fontSize: 40 }} />
            <br />
            Seu carrinho está vazio.
          </div>
        ),
      }}
      renderItem={(item: Product) => (
        <List.Item
          extra={<Avatar src={item.image} shape="square" size={140} />}
          actions={[<ListItemAction id={item.id} />]}
        >
          <List.Item.Meta
            title={<Typography.Title level={3}>{item.name}</Typography.Title>}
            description={
              <span>
                <strong>
                  {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </strong>
                <br />
                {item.description}
              </span>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default ProductList;
