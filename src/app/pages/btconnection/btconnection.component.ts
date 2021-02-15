import { Component, OnInit, NgZone } from '@angular/core';
import { AlertController, ToastController, ModalController, PopoverController, ActionSheetController } from '@ionic/angular';
// import { BLE } from '@ionic-native/ble/ngx';
import * as cordova from 'cordova'
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LockRecordsComponent } from '../lock-records/lock-records.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
// const lock_service = 'ff10';
// const SWITCH_CHARACTERISTIC = 'ff11';
var lock_service;
var SWITCH_CHARACTERISTIC;

// declare var CustomBLE
@Component({
  selector: 'app-btconnection',
  templateUrl: './btconnection.component.html',
  styleUrls: ['./btconnection.component.scss'],
})
export class BtconnectionComponent implements OnInit {

  disconnected = true;
  connected = false;
  connecting = false;
  devState = 'disconnected'
  infoCard = true;
  op_Card = false;
  configCard = false;
  aux_rot = false;
  autolock = false;
  directionString = 'Left';
  direction =0

  devices: any[] = [];
  devicevl;
  statusMessage: string;

  peripheral: any = {};
  lockvalue: boolean;

  timeToShow
  rangevalue
  magnetTime= "3";
  closeTime = 10;
  magnetString ='0s'
  snInfo= '6RLxgWwJKJkCKEFa6brXrB9lkaAHvrPJi0vLokBgd2aCu/0RCXaTDkui4ASPJGbc/wVZWV0KUqUdJT1oq9FR//8FWVldClKlHSU9aKvRUf//BVlZXQpSpR0lPWir0VH//wVZWV0KUqUdJT1oq9FR//Ndazkjr98mbDEwZzQoxrEhzyNislT+jE81eEsD4t2PYqoE3ll1DWmfaJ/gcd98cArwp++6XTAcupECUJbt9NgQ4qZlVxTNm7OgQ8TBSIt71KxQfNH0iMUHJ0KRMwBVXlysgpW7Tzt+sl3GoX3zF6n/BVlZXQpSpR0lPWir0VH//wVZWV0KUqUdJT1oq9FR//8FWVldClKlHSU9aKvRUf//BVlZXQpSpR0lPWir0VH//wVZWV0KUqUdJT1oq9FR//8FWVldClKlHSU9aKvRUf//BVlZXQpSpR0lPWir0VH//wVZWV0KUqUdJT1oq9FR//8FWVldClKlHSU9aKvRUf//BVlZXQpSpR0lPWir0VH//wVZWV0KUqUdJT1oq9FR//8FWVldClKlHSU9aKvRUf//BVlZXQpSpR0lPWir0VH//wVZWV0KUqUdJT1oq9FR//8FWVldClKlHSU9aKvRUf//BVlZXQpSpR0lPWir0VH//wVZWV0KUqUdJT1oq9FR/+i/cVq1OcLiYGSr/pfPSVQ=9f36b80de3a1c8d3472f351c3202d7a6';
  // bindkey= '3800070';
  sninfo: string = this.user.l_serial_info;
  key: string = '';
// proceed = false;

  locks:any = [];

  del_lock = false;

  constructor(
    // private ble: BLE, 
    private user: UserService, private auth: AuthService, private popoverController: PopoverController,
    private ngZone: NgZone, private modalCtrl : ModalController,        
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router,
    public alertController: AlertController,
    public actionsheetCtrl: ActionSheetController) { 
      this.getLockDevices();
      
    }

  ngOnInit() {
    this.scan();
    console.log(this.user.l_serial_info);
    console.log(this.user.l_serial_number);
    this.sninfo=this.user.l_serial_info
  }
  ionViewDidEnter(){
    console.log('ionviewDidEnter');
    
  }


  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: `<div style='border:2px solid red; height:70px; width:80px;'></div>`,
  //     cssClass: 'my-custom-class',
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();
  // }


  getLockDevices(){
    this.devices = [];
    this.user.present('loading...')
    this.auth.getLocks().subscribe(res=>{
      this.locks = res;
      console.log(this.locks);
      for (let lock of this.locks){
        this.devices.push(
          {
            name: "not in range",
            lockId: "not in range",
            rssi: "not in range",
            advertising: '',
            id: lock.id,
            lockSN: lock.serial_number,
            snInfo: lock.serial_info,
          }
        )
      }
      
      this.scan();
      this.user.dismiss()
      // alert("data-lock"+JSON.stringify(res))
    }, err=>{
      this.user.showToast('Something went wrong');
      this.user.dismiss()
    })
  }

  scanedDevs =[];
  scan(){
    this.scanedDevs =[];
 
  //  this.ble.scan([],10).subscribe(
  //   device => {
      
  //     this.onDeviceDiscovered(device)
  //   }, 
  //   error => {
  //   }
     
  //  );
   
   setTimeout(()=>{
    //  this.setStatus('Scan complete');
    //  if(this.scanedDevs != []){
       for (let dev of this.devices){
      // alert(dev.lockSN)
       
        for(let s of this.scanedDevs){
          if(s.dev_name.match(dev.lockSN)){
            // alert(s.dev_name+dev.lockSN)
            dev.name= s.dev_name;
            dev.lockId = s.dev_lockId;
            dev.rssi= s.dev_rssi;
            dev.advertising= s.dev_advertising;
          }
         }
       }
    //  }
    }, 10000);
  }

  onDeviceDiscovered(device) {
    // this.ngZone.run(()=>{
      // for (let dev of this.devices){
      // alert(lock.serial_number)
      // if(device.name.match(dev.serial_number)){
        this.scanedDevs.push({
          dev_name: device.name,
          dev_lockId: device.id,
          dev_rssi: device.rssi,
          dev_advertising: device.advertising
        })
           
      // } 
      
    //  }
     
    //  console.log("hi"+JSON.stringify(this.devices));
    
  //  })

 }

 // If location permission is denied, you'll end up here
// async scanError(error) {
  
//   let toast =await this.toastCtrl.create({
//     message: 'Error scanning for Bluetooth low energy devices',
//     position: 'middle',
//     duration: 5000
//   });
//   toast.present();
// }

async showToast(msg){
  let toast =await this.toastCtrl.create({
    message: msg,
    position: 'middle',
    duration: 3000
  });
  toast.present();
}

// deviceSelected(device) {
// // alert(device)
// this.devicevl=device;
// // alert("selected device-:"+this.devicevl)
// console.log(JSON.stringify(this.devicevl) + ' selected');
// console.log("getdevice detailsafterclickbt:"+ JSON.stringify(this.devicevl))

// this.setStatus('Connecting to ' +  this.devicevl);
// this.ble.connect(this.devicevl).subscribe(peripheral => {
//   this.onConnected(peripheral)
// },
// peripheral => this.showAlert('Disconnected', 'The peripheral unexpectedly disconnected'+JSON.stringify(peripheral))
// );
// }

// onConnected(peripheral) {
// // alert("details get connection: "+ JSON.stringify(peripheral))
// this.peripheral = peripheral;
// alert('periferal'+JSON.stringify(peripheral))
// this.setStatus('Connected to ' + ( peripheral));
// // Update the UI with the current state of the switch characteristic

// this.ble.read(this.peripheral, "2901", "2902").then(
// buffer => {
// let data = new Uint8Array(buffer);
// console.log('switch characteristic ' + data[0]);
// alert(JSON.stringify(buffer))
// this.ngZone.run(() => {
//  this.lockvalue = data[0] !== 0;
// });
// }, err=> alert(JSON.stringify(err))
// )    
// }

// setStatus(message) {
// console.log(message);
// this.ngZone.run(() => {
// this.statusMessage = message;
// });
// }

async showAlert(title, message) {
let alert = await this.alertCtrl.create({
header: title,
message: message,
buttons: ['OK']
});
alert.present();
}
lock_id
search(device){
  if(this.del_lock == true){return;}
  if (device == 'noid'){this.showToast('Please Test only Lock/Unlock')}
  else {
    this.sninfo = device.snInfo;
    this.lock_id = device.id;
  }
  
  // this.infoCard= false;
  // this.op_Card = true;
  // alert(this.snInfo)
  this.user.present('Please wait...')
  setTimeout(()=>this.user.dismiss(),5000);
  this.getState()
  let body:any ={'snInfo': this.sninfo, 'key': this.key}
  // alert(JSON.stringify(body))
  // CustomBLE.search(
  // body, 
  // res=>{
  //   // alert('searchRes'+JSON.stringify(res))
    
  //   // this.infoCard= false;
  //   // this.op_Card = true;
  //   }, this.failure);
    setTimeout(() => {
      this.funClick('connect')
    }, 500);
}

getState(){
  setTimeout(()=>{
    let body={}
    // CustomBLE.getState(
    //   body,
    //   res=>{
    //     // alert('dev_st'+JSON.stringify(res))
    //     this.devState = res;
    //   },
    //   err=>{this.showToast('dev_err'+JSON.stringify(err))}
    // )
  },5000);
  
}
lockClick=false;
unlockClick=false;
async openRecordsPage(lockid, records){
  const modal = await this.modalCtrl.create({
    component: LockRecordsComponent,
    componentProps: {rec_data: records, lockId: lockid}
  });
  return await modal.present();
}

funClick(fun_name){
  // if((fun_name !=='connect' || 'disconnect') && !this.connected){alert('not connected');
  // return;}
  let lockid = this.lock_id;
    let body:any ={'clickOn': fun_name}
    if (fun_name=='disconnect'){
      this.connected = false;
      this.disconnected = true;
      this.infoCard = true;
      this.op_Card = false;
      // return;
    }
    
    if(fun_name== 'setKey'){
      var keyToSet = prompt("Please enter new key");
      if (keyToSet != null) {
      body ={'clickOn': fun_name, 'keyToSet': keyToSet}
      } else {
        return;
      }
    }
    if(fun_name == 'setlocaltime'){
      var localTime = prompt("Local Time:",Math.round(new Date().getTime()/1000).toString());
      if(localTime != null){
        body = {'clickOn': fun_name, 'localTime': localTime}
      } else{
        return;
      }
    }
    
    if(fun_name == 'setconfig'){
      body ={
        'clickOn': fun_name,
        'direction': this.direction,
        "enableAutoClose": this.autolock ? 1:0,
        "automaticClosingTime": this.closeTime,
        "enableMagnetic": this.sensorChecked ? 1:0,
        "magneticTime": this.magnetTime,
        "auxiliaryrotation": this.aux_Rotation ? 0:1
      }
    }
    if(fun_name == 'record'){
      this.user.present('Please Wait...')
      this.auth.getLockRecord(lockid).subscribe(res=>{
        this.user.dismiss()
        // alert(JSON.stringify(res))
        this.openRecordsPage(lockid, res);
      },
       err=>{this.showToast('Network or Server issue')})
       return;
    }

    // CustomBLE.onClick(body, 
    //   result=>{
    //     if(result.action == 'config' && result.locktype == 'M500'){
    //         // alert(JSON.stringify(result.locktype, undefined, 2));
    //         this.op_Card = false;
    //         this.configCard = true;
    //         this.aux_rot = true;
    //         return;
    //     }
    //     if(fun_name == 'connect'){
    //       this.disconnected= false;
    //       // this.devState='connecting'
    //       this.user.present('Connecting...')
    //       setTimeout(()=>{
    //         this.user.dismiss()
    //         this.connecting = false;
    //         this.connected = true;
            
    //       },4000);
    //       // this.disconnected = false;
    //       // this.connected = true;
    //     }
    //     if(fun_name == 'lock'){
    //       this.lockClick=true;
    //       this.unlockClick=false;
    //       this.auth.recordLockActivity(lockid, false).subscribe(res=>{console.log(JSON.stringify(res))},
    //        err=>{this.showToast('Network/Server Error')})
    //     }
    //     if(fun_name == 'unlock'){
    //       this.lockClick=false;
    //       this.unlockClick=true;
    //       this.auth.recordLockActivity(lockid, true).subscribe(res=>{console.log(JSON.stringify(res))},
    //        err=>{this.showToast('Network/Server Error')})
    //     }
    //     this.getState()
    //       // alert("success"+JSON.stringify(result, undefined, 2));
    //       console.log("success"+JSON.stringify(result, undefined, 2));
    //   }, 
      
    //   this.failure)
}

 success = function(result) {
  // alert("success"+JSON.stringify(result, undefined, 2));
  console.log("success"+JSON.stringify(result, undefined, 2));
}
 failure = function(result) {
  alert(JSON.stringify(result, undefined, 2));
  console.log(JSON.stringify(result, undefined, 2));
}

  // config card functions.........
  aux_Rotation = false;
  auxRotation(e){
    if(e.currentTarget.checked){
      this.aux_Rotation = true;
    } else
    if(!e.currentTarget.checked){
      this.aux_Rotation = false;
    }
  }

  autoLock(e){
    if(e.currentTarget.checked){
      this.autolock = true;
    } else
    if(!e.currentTarget.checked){
      this.autolock = false;
    }  
  }
  sensorChecked = false;
  doorSensor(e){
    this.rangevalue = 0;
    this.magnetTimeChanged(0);
    this.noMagnetTimeChanged(0);
    // seekBarAuto.setProgress(0);
    if(e.currentTarget.checked){
      this.sensorChecked = true;
    } else
    if(!e.currentTarget.checked){
      this.sensorChecked = false;
    }
  }

  lockTime(e){
    if(this.sensorChecked){
      this.magnetTimeChanged(e.currentTarget.value);
    } else if(!this.sensorChecked){
      this.noMagnetTimeChanged(e.currentTarget.value);
    }
    // alert(JSON.stringify(e.currentTarget.value));
  }

  doorDirection(e){
    if(e.currentTarget.checked){
      this.direction = 1;
    } else
    if(!e.currentTarget.checked){
      this.direction = 0
    }
    this.directionString = this.direction ? 'Right':'Left';
  }
  
  magnetTimeChanged(value) {
    switch (value) {
        case 0: {
            this.magnetString = "0s";
            
           this.magnetTime= "0";
            break;
        }
        case 1: {
            this.magnetString = "3s";
            
           this.magnetTime= "3";
            break;
        }
        case 2: {
            this.magnetString = "4s";
            
           this.magnetTime= "4";
            break;
        }
        case 3: {
            this.magnetString = "5s";
            
           this.magnetTime= "5";
            break;
        }
        case 4: {
            this.magnetString = "8s";
            
           this.magnetTime= "8";
            break;
        }
        case 5: {
            this.magnetString = "10s";
            
           this.magnetTime= "10";
            break;
        }
        case 6: {
            this.magnetString = "15s";
            
           this.magnetTime= "15";
            break;
        }
        case 7: {
            this.magnetString = "20s";
            
           this.magnetTime= "20";
            break;
        }
        case 8: {
            this.magnetString = "25s";
            
           this.magnetTime= "25";
            break;
        }
        case 9: {
            this.magnetString = "30s";
            
           this.magnetTime= "30";
            break;
        }
        case 10: {
            this.magnetString = "40s";
            
           this.magnetTime= "40";
            break;
        }
        case 11: {
            this.magnetString = "50s";
            
           this.magnetTime= "50";
            break;
        }
        case 12: {
            this.magnetString = "60s";
            
           this.magnetTime= "60";
            break;
        }
        case 13: {
            this.magnetString = "80s";
            
           this.magnetTime= "80";
            break;
        }
        case 14: {
            this.magnetString = "100s";
            
           this.magnetTime= "100";
            break;
        }
        case 15: {
            this.magnetString = "120s";
            
           this.magnetTime= "120";
            break;
        }
        case 16: {
            this.magnetString = "140s";
            
           this.magnetTime= "140";
            break;
        }
        case 17: {
            this.magnetString = "160s";
            
           this.magnetTime= "160";
            break;
        }
        case 18: {
            this.magnetString = "180s";
            
           this.magnetTime= "180";
            break;
        }
        default:
            break;
    }
}

  noMagnetTimeChanged(value) {
    switch (value) {
        case 0: {
            this.magnetString = "0s";
            
            this.closeTime = 0;
            break;
        }
        case 1: {
            this.magnetString = "10s";
            
            this.closeTime = 10;
            break;
        }
        case 2: {
            this.magnetString = "20s";
            
            this.closeTime = 20;
            break;
        }
        case 3: {
            this.magnetString = "30s";
            
            this.closeTime = 30;
            break;
        }
        case 4: {
            this.magnetString = "40s";
            
            this.closeTime = 40;
            break;
        }
        case 5: {
            this.magnetString = "50s";
            
            this.closeTime = 50;
            break;
        }
        case 6: {
            this.magnetString = "1min";
            
            this.closeTime = 60;
            break;
        }
        case 7: {
            this.magnetString = "1min"
                    + "30s";
            
            this.closeTime = 90;
            break;
        }
        case 8: {
            this.magnetString = "2min";
            
            this.closeTime = 120;
            break;
        }
        case 9: {
            this.magnetString = "2min"
                    + "30s";
            
            this.closeTime = 150;
            break;
        }
        case 10: {
            this.magnetString = "3min";
            
            this.closeTime = 180;
            break;
        }
        case 11: {
            this.magnetString = "4min";
            
            this.closeTime = 240;
            break;
        }
        case 12: {
            this.magnetString = "5min";
            
            this.closeTime = 300;
            break;
        }
        case 13: {
            this.magnetString = "6min";
            
            this.closeTime = 360;
            break;
        }
        case 14: {
            this.magnetString = "7min";
            
            this.closeTime = 420;
            break;
        }
        case 15: {
            this.magnetString = "8min";
            
            this.closeTime = 480;
            break;
        }
        case 16: {
            this.magnetString = "10min";
            
            this.closeTime = 600;
            break;
        }
        case 17: {
            this.magnetString = "13min";
            
            this.closeTime = 780;
            break;
        }
        case 18: {
            this.magnetString = "15min";
            
            this.closeTime = 900;
            break;
        }
        case 19: {
            this.magnetString = "20min";
            
            this.closeTime = 1200;
            break;
        }
        case 20: {
            this.magnetString = "25min";
            
            this.closeTime = 1500;
            break;
        }
        case 21: {
            this.magnetString = "30min";
            
            this.closeTime = 1800;
            break;
        }
        default:
            break;
    }
}
  upgradeCard = false;
  upgradePage(fun){
    this.op_Card = false;
    this.upgradeCard = true;
  }

  testlock = false;
  infoCard1 = false;
  testLock(ev){
    this.testlock = !this.testlock;
    this.del_lock = false;
    // this.presentPopover(ev);
  }
  openInfoCard1(){
    this.infoCard1 = true;
    this.testlock = false;
  }

  deleetLock(lockID){
    Swal.fire({
      title: 'Are you sure?',
      text: "Records of this lock will also be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.user.present('DELETING...')
        this.auth.deleteAllRecords(lockID).subscribe(res=>{
          // alert(JSON.stringify(res))
          this.auth.deleteLock(lockID).subscribe(res=>{
            this.devices = this.devices.filter(item => item.id !== lockID)
            this.user.dismiss()
            // alert(JSON.stringify(res))
          }, err=>{
            this.user.dismiss()
            this.showToast('Network/Server Error')
          })
        }, err=>{
          this.user.dismiss()
          this.showToast('Network/Server Error')
        })
    
      }
    })

  }
  async actionsheet(){
    const actionSheet = await this.actionsheetCtrl.create({  
      header: 'Modify your  device',  
      buttons: [  
        {  
          text: 'Scheduler',  
          icon: 'alarm', 
          handler: () => {  
            console.log('scheduler device click');  
           
            
          }  
        },
        {  
          text: 'Set time',  
          icon: 'timer',
          handler: () => {  
            console.log('set timer click clicked');  
           this.funClick("setlocaltime");
            
          }  
        },
        {  
          text: 'Config',  
          icon: 'settings',
          handler: () => {  
            console.log('config click clicked');  
           this.funClick("config");
          }  
        },
        {  
          text: 'Upgrade',  
          icon: 'hammer',
          handler: () => {  
            console.log('upgrade click clicked');  
            this.upgradePage("upgrade");
          }  
        },
        {  
          text: 'Set Key',  
          icon: 'key',
          handler: () => {  
            console.log('set key click clicked');  
            this.funClick("setKey")
          }  
        },
         {  
          text: 'Cancel', 
          icon: 'close', 
          role: 'cancel',  
          handler: () => {  
            console.log('Cancel clicked');  
          }  
        }  
      ]  
    });  
    await actionSheet.present();  
  } 

  backbutton(){
    this.user.showDevice=false;
    this.user.showRoom=true;
  }
}
