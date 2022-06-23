import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Fayjul',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Nasif',
      email: 'user@example.com',
      password: bcrypt.hashSync('12345678'),
      isAdmin: false,
    },
    {
      name: 'Adib',
      email: 'adib@example.com',
      password: bcrypt.hashSync('1234567'),
      isAdmin: false,
    },
  ],
  products: [
    {
      //_id: '1',
      name: 'Teer 5L',
      slug: 'teer-5l',
      category: 'Oil',
      image: '/images/p1.jpg', // 679px × 829px
      price: 1020,
      countInStock: 10,
      brand: 'Teer',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality oil',
    },
    {
      //_id: '2',
      name: 'Boshundhara 5L',
      slug: 'boshundhara-5l',
      category: 'Soyabin oil',
      image: '/images/p2.jpg',
      price: 1250,
      countInStock: 10,
      brand: 'Boshundhra',
      rating: 3.5,
      numReviews: 50,
      description: 'high quality soyabin',
    },
    {
      //_id: '3',
      name: 'Fresh 5L',
      slug: 'fresh-5l',
      category: 'soyabin',
      image: '/images/p3.jpg',
      price: 999,
      countInStock: 15,
      brand: 'Freesh',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality soyabin product',
    },
    {
      // _id: '4',
      name: 'BN-5L',
      slug: 'bd-soyabin',
      category: 'soyabin',
      image: '/images/p2.jpg',
      price: 1065,
      countInStock: 0,
      brand: 'Bd',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality soyabin product',
    },
  ],
};
export default data;
