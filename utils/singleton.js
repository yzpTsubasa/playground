import {Base, AppEvent} from '../utils/base';
import {Cart} from '../pages/cart/cart_model';
import {Home} from '../pages/home/home_model';
import {Product} from '../pages/product/product_model';
import {Theme} from '../pages/theme/theme_model';
import {Category} from '../pages/category/category_model';
import {Address} from '../data/address_model';
import {Token} from '../data/token_model';
import {Order} from '../pages/order/order_model';

export class Singleton {
  static Cart = new Cart();
  static Home = new Home();
  static Product = new Product();
  static Theme = new Theme();
  static Category = new Category();
  static Address = new Address();
  static Token = new Token();
  static Order = new Order();
}

export {
  Base, AppEvent,
  Cart,
  Home,
  Product,
  Theme,
  Category,
  Address,
  Token,
  Order,
};