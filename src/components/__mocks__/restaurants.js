import { MOCK_REGULAR_USER } from "./users";

export const MOCK_RESTAURANTS = [
  {
    id: 1234,
    name: 'Sakaar Champions\' Bar',
    image: 'https://test.com/test.jpg',
    averageRating: 3.7,
  },
  {
    id: 2345,
    name: 'Stark Industries Lounge',
    image: 'https://test.com/test.jpg',
    averageRating: 4.9,
  },
];

export const MOCK_RESTAURANT = {
  id: 1,
  ownerId: 1234,
  name: 'Santa Maria Pizzeria',
  image: 'https://cdn.vox-cdn.com/thumbor/h0KYQAaMYPHXdCSnVu0399nqTeI=/0x0:2367x3550/1200x900/filters:focal(995x1586:1373x1964):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/62567080/Eater_day4_Santa_Maria_0173.0.0.jpg',
  address: '32 Test Street',
  reviews: [
    {
      id: 1,
      userId: 3567,
      rating: 3,
      comment: 'Decent value, but nothing incredible',
      visitDate: '2020-07-13T15:30:37.6+01:00'
    },
    {
      id: 2,
      userId: 3589,
      rating: 1,
      comment: 'Rubbish',
      visitDate: '2020-07-10T23:48:04.756+01:00'
    },
    {
      id: 3,
      userId: 3523,
      rating: 5,
      comment: 'AMAZING',
      visitDate: '2020-07-16T21:50:57.275+01:00'
    }
  ],
  description: 'Excellent London pizzerias are ten a penny these days, but at Ealing’s homage to Naples, Santa Maria, there remains something original. Flash-cooking in a wood-fired oven blisters the crust, while the interior remains chewy and yields spectacularly. Toppings are almost accessories, given the quality of the base, but there too, there’s quality — nduja, fior di latte, the tomatoes. It\'s far out of town, but worth the journey.',
  averageRating: 3
};

export const MOCK_RESTAURANT_WITH_USER_REVIEW = {
  ...MOCK_RESTAURANT,
  id: 2,
  reviews: MOCK_RESTAURANT.reviews.concat({
    id: 4,
    userId: MOCK_REGULAR_USER.id,
    rating: 4,
    comment: 'Test',
    visitDate: new Date().toISOString(),
  }),
};
