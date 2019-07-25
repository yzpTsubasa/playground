import {Cart, CartEvent} from '../pages/cart/cart_model';
import {Home} from '../pages/home/home_model';
import {Product} from '../pages/product/product_model';
import {Theme} from '../pages/theme/theme_model';
import {Category} from '../pages/category/category_model';

export class Singleton {
  static Cart = new Cart();
  static Home = new Home();
  static Product = new Product();
  static Theme = new Theme();
  static Category = new Category();
}

export {Cart, CartEvent, Home, Product, Theme, Category};