import { Component, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { Platform, AlertController, MenuController } from '@ionic/angular';
import { cordova } from '@ionic-native/core';
//import { Network } from '@ionic-native/network/ngx';
import { AuthService } from 'src/app/services/auth.service';
// import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

// import { Network } from '@ionic-native/network/ngx';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { UserService } from 'src/app/services/user.service';
// import { Diagnostic } from '@ionic-native/diagnostic';

// import { cordova } from '@ionic-native/core';

@Component({
  selector: 'app-wifi-settings',
  templateUrl: './wifi-settings.component.html',
  styleUrls: ['./wifi-settings.component.scss'],
})
export class WifiSettingsComponent implements OnInit {
  networks:HotspotNetwork[]=[];
  
  constructor(private menu: MenuController,
              private auth:AuthService,
              private platform: Platform,
              private nativeSettings:OpenNativeSettings,
              public alertController: AlertController,
              public hotspot:Hotspot,
              private user: UserService) {

                this.platform.ready().then(()=>{
                  this.hotspot.scanWifi().then((network: HotspotNetwork[])=>{
                 this.networks=(network);
                 console.log(JSON.stringify(this.networks))
                //  this.user.showToast(JSON.stringify(this.networks));
                  })
                })
               }

          
  moduleName;
  module;
  wifiSwitching=false;
  wifi=true;
  ngOnInit() {
     this.getModules();
  }
  openMenu(){
    this.menu.enable(true);   
  }
  select(e){
    let val=e.currentTarget.value;
    console.log(val);
    if(val=="Connect") {
      this.wifiSwitching=false;
      this.wifi=true;
      console.log("ffygh")
    }
    if(val=="Switch") {
      this.wifiSwitching=true;
      this.wifi=false;
      this.presentAlertConfirm(); 
      console.log("hv")
    }
  }
    async presentAlertConfirm() {
      const alert = await this.alertController.create({
        header: 'Why Switch Wifi?',
        message: 'Your selected home wifi network is not working or during configuration of module you have not entered correct wifi name or password'+
        '<h3>Instructions for switch wifi </h3>'+
        '<ol><li>Go to wifi setting of mobile and connect to that module that you wish to switch</li>'+
        '<li>Once the mobile is connected to the module network,select that module on the screen</li></ol>',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });
      await alert.present();
    }
  
handleButtonClick() {
     this.platform.ready().then(() => {
     });
}

open(setting) {
  this.nativeSettings.open(setting).then(val => {
    alert(val);
  }).catch(err => {
    alert(JSON.stringify(err));
  });
}
irmodule;
lockres;
getModules(){
  this.auth.getModuleFromApi().subscribe(res=>{
    this.moduleName=res;
    console.log(res)
    console.log(this.moduleName)
  },err=>{
    console.log("module err" + err);
  }
  )
  this.auth.showAddedIRModule().subscribe(res=>{
    this.user.dismiss();
    this.irmodule=res;
    console.log("IR details:" + JSON.stringify(this.irmodule))
  },err=>{
    console.log("IR not found");
  })

   this.auth.getshowAddedMoodDevice().subscribe(res=>{
    this.user.dismiss();
    console.log(res)
    this.user.moodModule=res;
},err=>{
  console.log("mood not found.." + err.error)
})

this.auth.getLocks().subscribe((res)=>{
  this.lockres=res;
  console.log("lockres:"+ JSON.stringify(this.lockres));
},err=>{
  console.log("lock not found.." + err.error)
})
}
switchWifi(id,name){
  if(name=="'Mono_Devices' || 'Duo_Devices || Trio_Devices"){
    console.log("devices_module_id:"+ id);
    console.log("devices_module_name:"+ name);
    this.auth.switchWifiForModule(id).subscribe(res=>{
      // alert("Successfully Switched Device Module Wifi");
      this.user.showToast('Successfully Switched Device Module Wifi');
    },err=>{
      this.user.showToast(err.error);
    })
  }

  else if (name=='Ir_Blaster') {
    console.log("ir_module_id:"+ id);
    console.log("ir_module:"+ name);
    this.auth.switchWifiForModule(id).subscribe(res=>{
      // alert("Successfully Switched Device Module Wifi");
      this.user.showToast('Successfully Switched IR Module Wifi');
    },err=>{
      this.user.showToast(err.error);
    })
    
  } else if (name=='Mood_Lighting') {
    console.log("mood_module_id:"+ id);
    console.log("mood_module_name:"+ name);
    this.auth.switchWifiForModule(id).subscribe(res=>{
      // alert("Successfully Switched Device Module Wifi");
      this.user.showToast('Successfully Switched Mood Module Wifi');
    },err=>{
      this.user.showToast(err.error);
    })
    
  }
  else {
    console.log("lock_module_id:"+ id);
    console.log("lock_module_name:"+ name);
    this.auth.switchWifiForModule(id).subscribe(res=>{
      this.user.showToast('Successfully Switched Lock Module Wifi');
    },err=>{
      this.user.showToast(err.error);
    })
  }
  }

  backbutton(){
    this.user.showDevice=false;
    this.user.showRoom=true;
  }
  
}