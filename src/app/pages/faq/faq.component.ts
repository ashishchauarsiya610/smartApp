import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform, NavController, ModalController, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { DevicesComponent } from '../devices/devices.component';
import { AddlockinroomComponent } from '../addlockinroom/addlockinroom.component';
// import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
//import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx'; 
import { RouteConfigLoadStart } from '@angular/router';
 //import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
declare var WifiWizard2: any;
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  results1 = [];
  info_txt1 = "";
  options:InAppBrowserOptions = {
    location : 'no',//Or 'no' 
    //hidden : 'yes', //Or  'yes'
   // clearcache : 'yes',
   // clearsessioncache : 'yes',
   // zoom : 'no',//Android only ,shows browser zoom controls 
   hardwareback : 'no',
   hideurlbar:'yes',
   // mediaPlaybackRequiresUserAction : 'no',
   // shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    closebuttoncolor:"#0000ff",
    footer:'yes',
   // disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
   // enableViewportScale : 'no', //iOS only 
   // allowInlineMediaPlayback : 'no',//iOS only 
   // presentationstyle : 'pagesheet',//iOS only 
   // fullscreen : 'yes',//Windows only    
};
  //networks:HotspotNetwork[]=[];
   devicemodule;
   irmodule;
   moodmodule;
   lockres;
   val:boolean=true;
  moduleTypeShow = true;
  moduleqrscan = false;
  scannedData: any;

  

  addDevicepi:boolean=false;
  constructor(
              // private qrScanner: QRScanner, 
              private splashScreen: SplashScreen,
              private auth: AuthService, 
              private platform: Platform, 
              public navCtrl: NavController,
              public user: UserService,
              public modalController: ModalController,         
              // private nativeSettings:OpenNativeSettings,
              public alertController: AlertController,
              //public hotspot:Hotspot,
              private iab: InAppBrowser,
               //private wifiWiz: WifiWizard2
              ) { 
                
                this.getbothnetwork();
              this.platform.backButton.subscribeWithPriority(0,()=>{
              this.scannedData.unsubscribe();
                })
             
              }
              async getbothnetwork() {
               
                this.info_txt1 = "loading...";
                this.user.present('loading...');
                try {
                  let results1 = await WifiWizard2.scan();
                  this.results1 = results1;
                  this.info_txt1 = "";
                  this.user.dismiss();
                 //this.user.showToast('results1' + JSON.stringify(results1));
                 // alert(JSON.stringify(results1));
                } catch (error) {
                  this.info_txt1 = error;
                  this.user.dismiss();
                  this.user.showToast('something went wrong.please try again later.');
                }
              }
          
  ngOnInit() {
    //alert(JSON.stringify(WifiWizard2.isConnectedToInternet()))
  //   WifiWizard2.getConnectedSSID(res=>
  //     {
  //  alert(res)
  //   },err=>{
  //     alert("not connected")
  //   })
  }

     modulepi_id;
     module_name;

     wificheck(netcheck){
     // this.user.showToast(netcheck);
       if(netcheck.match('DYFO')){     
        let pi_id= JSON.stringify(netcheck).replace(/['"]+/g, '').substr(11,20);
        this.auth.qrCode(pi_id).subscribe(res=>{
           WifiWizard2.connect(netcheck,false);
           this.navCtrl.navigateRoot('/urlpage');
          // let enb=WifiWizard2.isWifiEnabled();
          // alert(enb);
          this.user.pi_id=pi_id;
           WifiWizard2.getConnectedSSID(res=>{
           // alert(res)
             if(res!==netcheck){
              
             //  alert("cfghbjkl;")
               WifiWizard2.disconnect(res);
               WifiWizard2.connect(netcheck);
               this.navCtrl.navigateRoot('/urlpage'); 
             }     
          // this.auth.getdevicemoduletoaddinroom(pi_id).subscribe(res=>{
          //   alert("ggg"+res[0].name);
          //   this.module_name=res[0].name;
          //   this.modulepi_id=res[0].pi_id;
          //   this.user.todayArr=this.modulepi_id;
          //  // this.user.showToast("Successfully added your modules...");
          // },err=>{
          //   alert(err.error);
          // }
          //     )
          //    if(res[0].name=='Mono_Devices'||'Duo_Devices'||'Trio_Devices')
          //   {
          //     this.modulepi_id=res[0].pi_id;
          //     this.adddeviceinroom(); 
          //   }
            
          //   else if(res[0].name=='Ir_Blaster'){
          //     this.user.dd_name=res[0].name;
          //     this.user.moduleIdForKey=res[0].id;
          //     this.user.module_piId=res[0].id;
          //     {
          //       this.navCtrl.navigateRoot('/ir-product');
          //     }
          //   }
          //   else if(res[0].name=='Mood_Lighting'){
          //     this.user.dd_name=res[0].name;
          //     this.user.moodDevice_id=res[0].id;
          //   {
          //  this.navCtrl.navigateRoot('/devices');
          //   }
          //   }
               
          },err=>{
            alert('not connected');
          })
          
        },err=>{
          this.user.showToast('module does not exist. please conact to our help & support team');
        })
       }
       else if(netcheck.match('M-300')){      
        this.user.showToast("you selected " + JSON.stringify(netcheck).replace(/['"]+/g, '').substr(0,5));
        let lock_add= JSON.stringify(netcheck).replace(/['"]+/g, '').substr(0,5);
        this.auth.lockQR(lock_add).subscribe(res=>{
          this.iab.create('http://192.168.4.1/','_blank', this.options);
          this.navCtrl.navigateRoot('/deviceforroom'); 
          this.user.showToast(JSON.stringify(res));
        },err=>{
          this.user.showToast('module does not exist. please conact to our help & support team');
        })
       }
       else if(netcheck.match('M-500')){      
        this.user.showToast("you selected " + JSON.stringify(netcheck).replace(/['"]+/g, '').substr(0,5));
        let lock_add= JSON.stringify(netcheck).replace(/['"]+/g, '').substr(0,5);
        this.auth.lockQR(lock_add).subscribe(res=>{
          this.iab.create('http://192.168.4.1/','_blank', this.options);
          this.navCtrl.navigateRoot('/deviceforroom'); 
          this.user.showToast(JSON.stringify(res));

        },err=>{
          // this.navCtrl.navigateRoot('/deviceforroom'); 
          this.user.showToast('module does not exist. please conact to our help & support team');
        })
       }
       else{
        // alert("check");
        // WifiWizard2.disconnect();
        // WifiWizard2.disable();
        //  let pass = prompt("WIFI PASSWORD:", "   ");  
        //     if (pass == null || pass == "") {
        //       alert(netcheck)
        //     }
        //     else{
        //       alert(netcheck)
        //       WifiWizard2.connect(netcheck,true,pass);
        //      // }
        //     }
        this.user.showToast('Please select valid module credential or contact to our support team.')
       }
               }

  addnewModule(){
    this.moduleTypeShow = false;
    this.moduleqrscan = true;
    console.log("open qr scanner..");
  }

 async  clickDeviceModule(modulepi_id,d_name){
     console.log("d_name" + d_name);
     this.user.dd_name=d_name;
     this.user.todayArr=modulepi_id;
     console.log(this.user.todayArr);
    //  this.user.show_deviceRoom=true;
  const modal = await this.modalController.create({
      component: DevicesComponent,
      componentProps: { player:  this.user.todayArr}
    });
    return await modal.present();
    
   }
   clickIRModule(moduleId,counter,pi_id,ir_name){
     console.log(counter);
     console.log(pi_id);
     console.log("ii_name" +ir_name);
     this.user.dd_name=ir_name;
   this.user.moduleIdForKey=moduleId;
   this.user.module_piId=moduleId;
   {
     this.navCtrl.navigateRoot('/ir-product');
   }
   }

   clickMoodModule(m_id,m_name,mood_pi){
     console.log(m_id);
     console.log(m_name);
     console.log("mm_name"+ mood_pi);
     this.user.dd_name=mood_pi;
     this.user.moodDevice_id=m_id;
     {
      this.navCtrl.navigateRoot('/devices');
    }
   }
  

  async clicklockModule(lock_id,lock_serial_no){
    console.log("lock_id:" + lock_id);
    console.log("lock_serial_no:" + lock_serial_no);
    const modal = await this.modalController.create({
      component: AddlockinroomComponent,
      componentProps: { lock_id:  lock_id,
                      lock_serial:lock_serial_no}
    });
    return await modal.present();
   }

  stopScan(){
    // this.qrScanner.destroy();
    this.moduleqrscan= false; 
    this.moduleTypeShow= true;
  }
  
  async adddeviceinroom(){
    this.user.todayArr=this.modulepi_id;
    console.log(this.user.todayArr);
    this.user.showToast(this.user.todayArr);
 const modal = await this.modalController.create({
     component: DevicesComponent,
     componentProps: { player:  this.user.todayArr}
   });
   return await modal.present();
  }

  addDevice(){
    console.log('add device click...');
    this.addDevicepi=true;

  }

  submitDevicePi(data){
  console.log('submit '+ data.deviceadd);
  let device_pi="P-"+ data.deviceadd;
  console.log(device_pi)
    this.addDevicepi=false;
    this.auth.qrCode(device_pi).subscribe(res1=>{
        this.auth.showAddedIRModule().subscribe(ir_res=>{
          console.log(ir_res);
          },err=>{
            this.user.showToast('module does not exist. please contact to our help & support team');
          })
        this.user.showToast(res1);
        console.log(device_pi);
        this.auth.getdevicemoduletoaddinroom(device_pi).subscribe(res=>{
          this.user.showToast(JSON.stringify(res[0].pi_id));
          console.log(device_pi);
          
          console.log(this.module_name);
          this.modulepi_id=res[0].pi_id;
          console.log(res[0].name);
          this.adddeviceinroom(); 
          if(res[0].name=='Mono_Devices'||'Duo_Devices'||'Trio_Devices')
          {
            this.modulepi_id=res[0].pi_id;
            this.adddeviceinroom(); 
          }
          else if(res[0].name=='Ir_Blaster'){
            this.user.dd_name=res[0].name;
            this.user.moduleIdForKey=res[0].id;
            this.user.module_piId=res[0].id;
            {
              this.navCtrl.navigateRoot('/ir-product');
            }
          }
          else if(res[0].name=='Mood_Lighting'){
            this.user.dd_name=res[0].name;
            this.user.moodDevice_id=res[0].id;
          {
         this.navCtrl.navigateRoot('/devices');
          }
          }
             
        })
        this.iab.create('http://192.168.4.1/','_blank', this.options);
        // this.navCtrl.navigateRoot('/deviceforroom');  
        // this.user.showToast(JSON.stringify(res));
      },err=>{
        this.user.showToast('module does not exist. please contact to our help & support team');
        // this.user.showToast(err.error);
      })
     }

    

  }