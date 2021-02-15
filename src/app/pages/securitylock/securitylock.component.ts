import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { NavController, ModalController } from '@ionic/angular';
import { DyfolockstatusComponent } from '../dyfolockstatus/dyfolockstatus.component';

@Component({
  selector: 'app-securitylock',
  templateUrl: './securitylock.component.html',
  styleUrls: ['./securitylock.component.scss'],
})
export class SecuritylockComponent implements OnInit {
  lo_res:any;
  lock_response=[];
  imgPath: string;
  mo_res:any;
  constructor(private user: UserService,
              private auth: AuthService,
              private navCtrl:NavController,
              public modalController: ModalController,   ) { 
                let TTtoken = localStorage.getItem('TTtoken');
                // this.user.showToast("LockToken: "+ TTtoken)
              }

  ngOnInit() {
    this.tTLocklist();
    // this.getlockmodule(); 
  }




  //*************** * TTLOck Started here ***************/
tTlockData;
ttLockdataAll;
tTLocklist(){
  var d= new Date();
  var n = d.getTime();
  var x=n;
  console.log(n);
    let TTtoken = localStorage.getItem('TTtoken');
    // this.user.showToast(TTtoken);
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        type:"2-Lift",               
        pageNo: "1",
        pageSize: "20",
        date:  JSON.stringify(x)
      }
    });
    const httpOptions = {
      headers: new HttpHeaders({     
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'Dyfo'
      })
    };
   
    
    console.log(params);
    
    // alert("data---"+ params);
    this.user.present('');
    this.auth.TTlock_list(params).subscribe(res=>{
      this.tTlockData=res;
      this.user.dismiss();
      this.ttLockdataAll=this.tTlockData.list;
      this.user.ttLockId=this.ttLockdataAll.lockId;
      console.log(this.ttLockdataAll);
      // this.user.showToast(JSON.stringify(res));
      // this.getlockDetails();
    },err=>{
      this.user.dismiss();
      this.user.showToast(JSON.stringify(err.error));
    })
  }


 lockID;
  
  
  ttLockClick(lockId,lockData,lockMac){
    this.user.ttLockId=lockId;
    this.user.lockData=lockData;
    this.user.ttlockMac=lockMac;
    // localStorage.setItem('lockId',lockId);
    this.navCtrl.navigateRoot('/ttoperatiion'); 
  }

  getlockmodule(){
    this.user.present('Please wait...');
      this.auth.getDoorLockModuleApi().subscribe(res=>{    
       this.mo_res=res;
       this.user.dismiss();
       console.log(this.mo_res)
     for(let i=0;i<this.mo_res.length;i++){
       this.auth.getDoorStatus((this.mo_res[i].pi_id)).subscribe(res=>{
         this.user.dismiss();
       this.lo_res=res;
      
       console.log(this.lo_res)
       if(this.lo_res[i].status==true){
      this.imgPath = 'assets/icon/unlock.jpeg'
       }
       if(this.lo_res[i].status==false){
          this.imgPath = 'assets/icon/lock.png'
       }
         this.lock_response[i]={
           'id': this.lo_res[i].id,  
           'device': this.lo_res[i].device,
           'pi_id': this.lo_res[i].pi_id,
           'name': this.lo_res[i].name,
           'device_type': "Door_Lock",
           'status': this.lo_res[i].status,
           'img':this.imgPath
         }
      },err=>{
       this.user.dismiss();
       alert(err.errror);
      })
     }
     },err=>{
       this.user.dismiss();
       alert(err.errror);
     })
    }
    changeDyfoLockStatus(e:any) {
      var img=document.getElementById(e)
      this.user.present('Please Wait...');
      if ((<HTMLInputElement>event.currentTarget).checked == true) {
        this.auth.changeStatuswithCheck(e, 1).subscribe(res => {
          this.user.dismiss();
          this.imgPath = 'assets/icon/unlock.jpeg' 
           img.setAttribute('src',this.imgPath)     
        })
      }
      if ((<HTMLInputElement>event.currentTarget).checked == false) {
        this.auth.changeStatuswithCheck(e, 0).subscribe(res => {
          this.user.dismiss();
           this.imgPath = 'assets/icon/lock.png'  
           img.setAttribute('src',this.imgPath)  
       })
     }
    }

   async dyfolockclick(id){
      const modal = await this.modalController.create({
        component: DyfolockstatusComponent,
        componentProps: { dyfolockid:  id}
      });
      return await modal.present();
    }
}
