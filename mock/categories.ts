import { Request, Response } from 'express';

const getCategories = (req: Request, res: Response) => {
  res.json([
    {
      id: 1,
      name: 'Bebidas',
    },
    {
      id: 2,
      name: 'Doces',
    },
    {
      id: 3,
      name: 'Salgados',
    },
  ]);
};

export default {
  'GET /api/categories': getCategories,
};
