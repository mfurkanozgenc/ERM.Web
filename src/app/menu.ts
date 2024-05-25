export class MenuModel{
  name : string = '';
  icon : string = '';
  url : string = '';
  isTittle : boolean = false;
  subMenus : MenuModel[] = [];
}
export const Menus : MenuModel[]=[
  {
    name : 'Anasayfa',
    icon : 'far fa fa-home',
    url : '/',
    subMenus : [],
    isTittle : false
  },
  {
    name : 'Ana Grup',
    icon : 'far fa fa-list',
    url : '',
    isTittle : false,
    subMenus : [
      {
        name : 'Müşteriler',
        icon : 'far fa fa-users',
        url : '/customers',
        subMenus : [],
        isTittle : false
      },
      {
        name : 'Depolar',
        icon : 'far fa fa-warehouse',
        url : '/depots',
        subMenus : [],
        isTittle : false
      },
      {
        name : 'Ürünler',
        icon : 'far fa fa-box',
        url : '/products',
        subMenus : [],
        isTittle : false
      },
      {
        name : 'Reçeteler',
        icon : 'far fa fa-list',
        url : '/recipes',
        subMenus : [],
        isTittle : false
      }
    ]
  },
  {
    name : 'Siparişler',
    icon : 'far fa fa-clipboard-list',
    url : '/orders',
    isTittle : false,
    subMenus : []
  },
  {
    name : 'Üretim',
    icon : 'far fa fa-cart-plus',
    url : '/productions',
    isTittle : false,
    subMenus : []
  },
  {
    name : 'Faturalar',
    icon : 'far fa fa-file-invoice',
    url : '/',
    subMenus : [
      {
        name : 'Alış Faturası',
        icon : 'far fa fa-users',
        url : '/invoices/purchase',
        subMenus : [],
        isTittle : false
      },
      {
        name : 'Satış Faturası',
        icon : 'far fa fa-warehouse',
        url : '/invoices/sale',
        subMenus : [],
        isTittle : false
      },
    ],
    isTittle : false
  }
]
