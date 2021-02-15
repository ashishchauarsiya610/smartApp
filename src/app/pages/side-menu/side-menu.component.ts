import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, NavController} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
//import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  public token2;
  //@ViewChild
  profName
  constructor(private menu: MenuController,
              private authService:AuthService,
              private user:UserService,
              private navCtrl:NavController,
              //private storage: Storage 
              ) { 
                setTimeout(() => {
                  this.profName = JSON.parse(localStorage.getItem('prof')).name
                }, 3000);
              }

  public menuItem = [
    { 
      title: 'Home', 
      url: '/mainpage',
      icon: "home"
    },
    { 
      title: 'Set up a Device',
       url: '/mcategory',
       icon: "add-circle"
      }, 
      { 
        title: 'Security Module',
         url: '/securityLock',
         icon: "lock-closed-outline"
        },
    { 
      title: 'Scene', 
      url: '/mode',
      icon: "aperture"
    },
    // { 
    //   title: 'Ir Learning', 
    //   url: '/irdatacolletion',
    //   icon: "aperture"
    // },
    { 
      title: 'Settings',
       url: '/allmodule',
       icon: "settings"
      },
      { 
        title: 'Favourite List',
         url: '/favlist',
         icon: "heart"
        },
        {
          title: 'Energy',
          url: '/energychart',
          icon: "sync-outline"
        },
    { 
      title: 'Help & Support',
      url: '/support',
      icon  : "help-circle"
    },
    
   ];

   profImg
   ngOnInit() {
    setTimeout(()=>{this.profImg=localStorage.getItem('pof_img')},3000);

   }
   menuclick(ur:any){
     if(ur=='Home'){
      this.navCtrl.navigateRoot('/mainpage');
      this.user.showDevice=false;
    this.user.showRoom=true;
      console.log('mainpage return');
     }
     else if(ur=='Scene'){
      this.navCtrl.navigateRoot('/mode');
      console.log('mode return');
     }
     else if(ur=='Set up a Device'){
      this.navCtrl.navigateRoot('/mcategory');
     }
     else if(ur=='Settings'){
      this.navCtrl.navigateRoot('/allmodule');
     }

   }

openPage(page) {
//   console.log(page.url);
//   // console.log(this.menu.enable(true))
this.menu.close() //.enable(false);
// this.menu.open('first');
}
openFirst() {
  this.menu.enable(true, 'first');
  this.menu.open('first');
}
logout(){
  this.authService.getLogoutFromApi().subscribe(res=>{
    // this.storage.remove('token2').then((res)=>{
    //   console.log("wifitoken"+this.token2);
    //   });
    console.log(res)
    localStorage.clear();
    //alert("Logout successfully.")
    this.navCtrl.navigateRoot('/login');
  },err=>{
    // alert("please re-login again..");
    localStorage.clear();
    this.navCtrl.navigateRoot('/login');
  }
  )
 }
}
