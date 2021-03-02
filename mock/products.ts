import { Request, Response } from 'express';

const getProducts = (req: Request, res: Response) => {
  res.json([
    {
      id: 0,
      idCategory: 1,
      image:
        'https://hiperideal.vteximg.com.br/arquivos/ids/185713-1000-1000/55723.jpg?v=637363732250500000',
      name: 'Coca-Cola Lata',
      description: 'Coca-Cola Lata 350ml',
      price: 3.5,
    },
    {
      id: 1,
      idCategory: 1,
      image:
        'https://www.confianca.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/2/2/228753_1.jpg',
      name: 'Fanta Uva Lata',
      description: 'Fanta Uva Lata 350ml',
      price: 3,
    },
    {
      id: 2,
      idCategory: 2,
      image: 'https://images-na.ssl-images-amazon.com/images/I/81ZK2IVOqbL._AC_SL1500_.jpg',
      name: 'Brigadeiro Moça',
      description: 'Brigadeiro Moça 385g',
      price: 8,
    },

    {
      id: 3,
      idCategory: 3,
      image:
        'https://savegnago.vteximg.com.br/arquivos/ids/446583-1000-1000/Salgadinho-Elma-Chips-Fandangos-45g-Pres.jpg?v=637283254909000000',
      name: 'Fandangos Presunto',
      description: 'Salgadinho Elma Chips Fandangos 45g Presunto',
      price: 4.5,
    },
  ]);
};

export default {
  'GET /api/products': getProducts,
};
