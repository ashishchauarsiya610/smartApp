import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ActionSheetController, ModalController, AlertController, Platform } from '@ionic/angular';
import { DevicesComponent } from '../devices/devices.component';
import { AddlockinroomComponent } from '../addlockinroom/addlockinroom.component';

@Component({
  selector: 'app-allmodule',
  templateUrl: './allmodule.component.html',
  styleUrls: ['./allmodule.component.scss'],
})
export class AllmoduleComponent implements OnInit {
  devicemodule;
  irmodule;
  moodmodule;
  lockres;
  modulepi_id;

  constructor(private user: UserService,
              private auth: AuthService,
              private navCtrl: NavController,
              private platform: Platform,
              private modalController: ModalController) {
            //     this.auth.getdevicemoduletoaddinroom('P-22').subscribe(res=>{
            //       console.log(res[0].name);
            //       this.modulepi_id=res[0].pi_id;
            //       if(res[0].name=='Mono_Devices'||'Duo_Devices'||'Trio_Devices')
            // {
            //   console.log(res[0].name);
            // }
            // else if(res[0].name=='Ir_Blaster'){
            //   console.log(res[0].name);
              
            // }
            //       this.adddeviceinroom();
            
            //     })
              }

  ngOnInit() {this.getDeviceModule();}
getmodeuldevice;
  async getDeviceModule(){
    // this.moduleTypeShow = true;
    // this.moduleqrscan = false;  
    this.user.present("please wait...");
    this.auth.getModuleFromApi().subscribe(res=>{
      this.devicemodule=res;
      this.getmodeuldevice=this.devicemodule;
      this.user.dismiss();
       
     
       console.log("devicemmoudle"+ JSON.stringify(this.getmodeuldevice));
      
     },err=>{
      this.user.dismiss();
      this.user.showToast('something went wrong.please try again later.');
       console.log("Device module not found");
     })
     console.log('device' + JSON.stringify(this.getmodeuldevice));
    
     
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
    this.devicemodule;
    this.irmodule;
    if(this.devicemodule=='' && this.irmodule== '' && this.lockres==" "){
      console.log('not added ')
  
     }
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
  console.log(this.user.module_piId);
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

   gotoirproductpage(){
    this.navCtrl.navigateRoot('/irdatacolletion');
   }
   gotodyfolistlist(){
    this.navCtrl.navigateRoot('/security');
   }

   backbutton(){
    this.user.showDevice=false;
    this.user.showRoom=true;
  }

 async adddeviceinroom(){
//     this.user.todayArr=this.modulepi_id;
//     console.log(this.user.todayArr);
//     this.user.showToast(this.user.todayArr);
//  const modal = await this.modalController.create({
//      component: DevicesComponent,
//      componentProps: { player:  this.user.todayArr}
//    });
//    return await modal.present();
  }
  add_devices(){
    this.user.present('please wait...');
    this.navCtrl.navigateRoot('/mcategory');
    this.user.dismiss();
  }


}
