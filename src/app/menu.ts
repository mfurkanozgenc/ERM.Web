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
    ]
  },
  // {
  //   name : 'Admin',
  //   icon : 'fas fa-solid fa-home',
  //   url : '/',
  //   subMenus : [],
  //   isTittle : true
  // },
  // {
  //   name : 'Yönetim',
  //   icon : 'fas fa-solid fa-user-tie',
  //   url : '/',
  //   subMenus : [
  //     {
  //       name : 'Kullanıcılar',
  //       icon : 'fas fa-solid fa-users',
  //       url : '/',
  //       subMenus : [],
  //       isTittle : true
  //     }
  //   ],
  //   isTittle : false
  // }
]
