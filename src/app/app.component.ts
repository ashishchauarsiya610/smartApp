import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
// import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

declare var TTlockdata;
declare var CameraCustom;
declare var FCMPlugin;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private androidPermissions: AndroidPermissions,
    // private fcm: FCM,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.pushSetup()
  TTlockdata.init("res",
  res=>{
    //alert(res)
    // alert("initialized")
  },
  err=>{
    // alert("show error")
  })
  CameraCustom.init("vbhc",
      res=>{
        //alert("1"+JSON.stringify(res))
        }, err=>{
     // alert("2,,,,"+JSON.stringify(err))
        })


      

      
   
    });
  }

  token;
  hasPermission;
    // private async pushSetup() {
    //   await this.platform.ready();
  
    //   console.log('FCM SETUP INIT');
    //   if (!this.platform.is('cordova')) {
    //     return;
    //   }
  
    //   console.log('IN CORDOVA');
  
    //   this.hasPermission = await this.fcm.requestPushPermission();
    //   console.log('CHECK hasPermission:', this.hasPermission);
  
    //   this.token = await this.fcm.getToken();
    //   console.log('CHECK getToken: ' + this.token);
     
    //   let body={
    //     fcmtoken:this.token 
    //   }
    //   CameraCustom.pushReg(body,
    //     res=>{
    //       alert("tuya call");
    //         alert("tuya"+JSON.stringify(res))
    //     },err=>{
    //        alert("tuya error:"+JSON.stringify(err))
    //     })
    //   console.log('ON NOTIFICATION SUBSCRIBE');
    //   this.fcm
    //     .onTokenRefresh()
    //     .subscribe((newToken) => {
        
    //       console.log('NEW TOKEN:'+ newToken);
       
    //     }
    //     );
    //   this.fcm
    //     .onNotification()
    //     .subscribe((payload: object) => console.log('ON NOTIFICATION:', payload));
        
        

    // }
        
   
}
