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
    ]
  }
]
