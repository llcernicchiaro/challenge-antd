import request from '@/utils/request';

export async function queryProducts(): Promise<any> {
  return request('/api/products');
}

export async function queryCategories(): Promise<any> {
  return request('/api/categories');
}
