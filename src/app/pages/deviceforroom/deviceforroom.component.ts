import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ActionSheetController, ModalController, AlertController, Platform } from '@ionic/angular';
import { DevicesComponent } from '../devices/devices.component';
import { AddlockinroomComponent } from '../addlockinroom/addlockinroom.component';

@Component({
  selector: 'app-deviceforroom',
  templateUrl: './deviceforroom.component.html',
  styleUrls: ['./deviceforroom.component.scss'],
})
export class DeviceforroomComponent implements OnInit {

  devicemodule;
  irmodule;
  moodmodule;
  lockres;

  constructor(private user: UserService,
              private auth: AuthService,
              private navCtrl: NavController,
              private platform: Platform,
              private modalController: ModalController) { }

  ngOnInit() {this.getDeviceModule();}

  async getDeviceModule(){
    // this.moduleTypeShow = true;
    // this.moduleqrscan = false;  
    this.user.present("please wait..")
    this.auth.getModuleFromApi().subscribe(res=>{
      this.user.dismiss();
       this.devicemodule=res;
       console.log("devicemmoudle"+ JSON.stringify(this.devicemodule));
     },err=>{
      this.user.dismiss();
      this.user.showToast('something went wrong.please try again later.');
       console.log("Device module not found");
     })
     
     this.auth.showAddedIRModule().subscribe(res=>{
      this.user.dismiss();
      this.irmodule=res;
      console.log("IR details:" + JSON.stringify(this.irmodule))
    },err=>{
      this.user.dismiss();
      this.user.showToast('something went wrong.please try again later.');
      console.log("IR not found");
    })

     this.auth.getshowAddedMoodDevice().subscribe(res=>{
      this.user.dismiss();
      console.log(res)
      this.user.moodModule=res;
  },err=>{
   this.user.dismiss();
   this.user.showToast('something went wrong.please try again later.');
    console.log("mood not found..")
  })

  this.auth.getLocks().subscribe((res)=>{
    this.lockres=res;
    console.log("lockres:"+ JSON.stringify(this.lockres));
  },err=>{
    this.user.showToast('something went wrong.please try again later.');
    console.log("lock not found..")
  })
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
   //  this.user.show_deviceirRoom=true;
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
   //  this.user.show_devicemoodRoom=true;
    {
     this.navCtrl.navigateRoot('/devices');
   }
  }

 async clickLockModule(lock_id,lock_serial_no){
   console.log("lock_id:" + lock_id);
   console.log("lock_serial_no:" + lock_serial_no);
   const modal = await this.modalController.create({
     component: AddlockinroomComponent,
     componentProps: { lock_id:  lock_id,
                     lock_serial:lock_serial_no}
   });
   return await modal.present();
  }
  locksetup(){
    console.log("click to scan lock module");
    this.navCtrl.navigateRoot('/locksetup');
  }

   gotowifipage(){
    this.navCtrl.navigateRoot('/wifi');
   }

   backbutton(){
    this.user.showDevice=false;
    this.user.showRoom=true;
  }

}
