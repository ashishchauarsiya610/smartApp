import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  lo_res:any;
  lock_response=[];
  imgPath: string;
  mo_res:any;
  constructor(private menu: MenuController,private auth:AuthService, public user:UserService) { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.getlockmodule();
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
  }
