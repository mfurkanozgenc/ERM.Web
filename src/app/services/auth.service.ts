import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserModel } from '../models/userModel';
import { MenuModel, Menus } from '../menu';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token : string = '';
  user : UserModel = new UserModel();
  menus = Menus;
  constructor(
    private router : Router
  ) { }

  isAuthenticated(){
     this.token = localStorage.getItem('token') ?? '';
     if(this.token === ''){
      this.router.navigateByUrl('login');
      return false;
     }
     const decode : JwtPayload | any = jwtDecode(this.token);
     const exp = decode.exp;
     const now = new Date().getTime() / 1000;

     if(now > exp){
         this.router.navigateByUrl('login');
         return false;
     }
     this.user.id = decode['Id'];
     this.user.name = decode['Name'];
     this.user.email = decode['Email'];
     this.user.userName = decode['UserName'];
     this.user.roleValueNumber = decode['Role'];
     return true;
  }

  roleControl(){ // Url kısmından yekisiz bir alana gidilmek istenirse direkt logine atılacak
    var pathName = window.location.pathname;
    console.log("PATHNAME",pathName);
    if(pathName == '/login') { return true;}
    if(pathName == '/') { return true;}
    var findMenu = this.menus.find(m => m.url ==  pathName && m?.subMenus?.length === 0);
    if(findMenu){
      if(findMenu.isRoleValue == 99 || findMenu.isRoleValue == this.user.roleValueNumber){
        return true;
      }
      else{
        this.router.navigateByUrl('login');
        return false;
      }
    }
    else{
      let allSubMenus:MenuModel[] = [];
      this.menus.forEach(menu => {
         menu.subMenus.forEach(subMenu => {
            allSubMenus.push(subMenu);
         });
      });
      var findSubMenu = allSubMenus.find(m => m.url ==  pathName);
      if(findSubMenu){
        console.log("BULUNAN",findSubMenu);
        if(findSubMenu.isRoleValue == 99 || findSubMenu.isRoleValue == this.user.roleValueNumber){
          return true;
        }
        else{
          this.router.navigateByUrl('login');
          return false;
        }
      }
    }
    return false;
  }

  exit(){
    localStorage.removeItem("token");
    this.user = new UserModel();
    this.router.navigateByUrl('login');
  }
}
