export class MenuModel{
  name : string = '';
  icon : string = '';
  url : string = '';
  isRoleValue : number = 1;
  isTittle : boolean = false;
  subMenus : MenuModel[] = [];
  isInvoiceType : number = 1;
}
export const Menus : MenuModel[]=[
  {
    name : 'Anasayfa',
    icon : 'far fa fa-home',
    url : '',
    subMenus : [],
    isTittle : false,
    isRoleValue : 99,
    isInvoiceType : 0
  },
  {
    name : 'Ana Grup',
    icon : 'far fa fa-list',
    url : '',
    isTittle : false,
    isInvoiceType : 0,
    isRoleValue : 99,
    subMenus : [
      {
        name : 'Müşteriler',
        icon : 'far fa fa-users',
        url : '/customers',
        subMenus : [],
        isTittle : false,
        isInvoiceType : 0,
        isRoleValue : 1
      },
      {
        name : 'Depolar',
        icon : 'far fa fa-warehouse',
        url : '/depots',
        subMenus : [],
        isTittle : false,
        isInvoiceType : 0,
        isRoleValue : 1
      },
      {
        name : 'Ürünler',
        icon : 'far fa fa-box',
        url : '/products',
        subMenus : [],
        isTittle : false,
        isInvoiceType : 0,
        isRoleValue : 99
      },
      {
        name : 'Reçeteler',
        icon : 'far fa fa-inbox',
        url : '/recipes',
        subMenus : [],
        isTittle : false,
        isInvoiceType : 0,
        isRoleValue : 99
      }
    ]
  },
  {
    name : 'Siparişler',
    icon : 'far fa fa-clipboard-list',
    url : '/orders',
    isTittle : false,
    subMenus : [],
    isInvoiceType : 0,
    isRoleValue : 99
  },
  {
    name : 'Üretim',
    icon : 'far fa fa-cart-plus',
    url : '/productions',
    isTittle : false,
    subMenus : [],
    isInvoiceType : 0,
    isRoleValue : 99
  },
  {
    name : 'Faturalar',
    icon : 'far fa fa-file-invoice',
    url : '/',
    isInvoiceType : 0,
    isRoleValue : 1,
    subMenus : [
      {
        name : 'Alış Faturası',
        icon : 'far fa fa-newspaper',
        url : '/invoices/purchase',
        subMenus : [],
        isTittle : false,
        isInvoiceType : 1,
        isRoleValue : 1
      },
      {
        name : 'Satış Faturası',
        icon : 'far fa fa-warehouse',
        url : '/invoices/sale',
        subMenus : [],
        isTittle : false,
        isInvoiceType : 2,
        isRoleValue : 1
      },
    ],
    isTittle : false
  },
  {
    name : 'Kullanıcılar',
    icon : 'far fa fa-users',
    url : '/users',
    isTittle : false,
    subMenus : [],
    isInvoiceType : 0,
    isRoleValue : 1
  },
]
