export class UserModel{
  id : string = '';
  name : string = '';
  email : string = '';
  userName : string = '';
  firstName : string = '';
  lastName : string = '';
  password : string = '';
  userRole : UserRoleTypeEnum = new UserRoleTypeEnum();
  roleValueNumber : number = 1;
}
export class UserRoleTypeEnum{
  value : number = 1;
  name : string = '';
}
