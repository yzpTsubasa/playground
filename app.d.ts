interface RequestParam {
  url: string;
  data: any;
  method: string;
  callback: Function;
  header: any;
  urlFormatParams: any;
}

interface ProductData {
  id: number;
  name: string;
  price: number;
  main_img_url: string;
  count: number;
  selected: boolean;
}

interface CartViewData {
  selectCount: number;
  allCount: number;
  selectPrice: number;
  allPrice: number;
  selectCartDatas: Array<ProductData>;
  cartDatas: Array<ProductData>;
}