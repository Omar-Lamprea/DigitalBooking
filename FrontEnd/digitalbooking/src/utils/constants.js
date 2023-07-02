export const GLOBAL_API = {
  //products
  urlBase: 'https://api.digitalbooking.online/digital-booking',
  // urlBase: 'http://localhost:8080/digital-booking',
  productsAll: "/product/all",
  product: "/product",
  productByCategory: '/productByCategory/',

  // Categories
  categoryAll: '/category/all',
  category: '/category',

  //auth
  login: "/auth",
  users: "/users",

  //cities
  citiesAll: "/city/all",
  cityByCountry: "/city/searchbycountry?nameCountry=",
  city: "/city",

  //Countries
  countriesAll: "/country/all",

  //Bookings
  bookings: "/bookings",
  bookingsByUser: "/searchbyuser?emailUser="
}