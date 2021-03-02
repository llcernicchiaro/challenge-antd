import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Select } from 'antd';
import { connect } from 'umi';
import type { Dispatch } from 'umi';
import type { ConnectState } from '@/models/connect';
import type { Category, Product } from '@/models/product';
import ProductList from '@/components/ProductList';
// import styles from './index.less';

const { Option } = Select;

export interface HomeProps {
  dispatch: Dispatch;
  products: Product[];
  categories: Category[];
  loadingProducts?: boolean;
  loadingCategories?: boolean;
}

const HomePage: React.FC<HomeProps> = (props) => {
  const { dispatch, categories, products, loadingProducts, loadingCategories } = props;
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    dispatch({ type: 'product/fetchProducts' });
    dispatch({ type: 'product/fetchCategories' });
  }, [dispatch]);

  useEffect(() => setFilteredProducts(products), [products]);

  const filterProducts = (id: number) => {
    setFilteredProducts(id ? products.filter((product) => product.idCategory === id) : products);
  };

  return (
    <PageHeaderWrapper>
      <Select
        loading={loadingCategories}
        placeholder="Selecione a categoria"
        style={{ width: '100%' }}
        onChange={filterProducts}
      >
        <Option value={0}>Todas as categorias</Option>
        {categories.map((category: Category) => (
          <Option key={category.id} value={category.id}>
            {category.name}
          </Option>
        ))}
      </Select>
      <ProductList
        loading={loadingProducts}
        products={filteredProducts}
        pagination={{ pageSize: 3 }}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ loading, product }: ConnectState) => ({
  loadingProducts: loading.effects['product/fetchProducts'],
  loadingCategories: loading.effects['product/fetchCategories'],
  products: product.products || [],
  categories: product.categories || [],
}))(HomePage);
