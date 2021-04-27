import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editdevice',
  templateUrl: './editdevice.component.html',
  styleUrls: ['./editdevice.component.scss'],
})
export class EditdeviceComponent implements OnInit {
players;
d_details;
d_type;
d_name:string;
d_id;
dimmer_id;
d_dimmer;
d_isdimmer;
d_min;
d_max;
  constructor(navParams: NavParams,
    public viewCtrl: ModalController,
    public auth: AuthService,
    public user: UserService,
    private navCtrl: NavController,
    public router: Router,
    ) { 
      this.players=navParams.get('players');
     this.d_details=this.players;
      this.d_type=navParams.get('de_type').replace(/['"]+/g, '');
      this.d_name=navParams.get('de_name').replace(/['"]+/g, '');
      this.d_id=navParams.get('de_id').replace(/['"]+/g, '');
      this.dimmer_id = navParams.get('de_id').replace(/['"]+/g, '');
      this.d_dimmer=navParams.get('de_dimmer').replace(/['"]+/g, '');
      this.d_isdimmer=navParams.get('de_isdimmer');
      this.d_min=navParams.get('de_min').replace(/['"]+/g, '');
      this.d_max=navParams.get('de_max').replace(/['"]+/g, '');
      console.log("get_all"+ JSON.stringify(this.d_details.name));
        console.log("get_d_type"+ (this.d_type));
        console.log("d_id"+ (this.d_id));
        console.log("d_dimmer"+ (this.d_dimmer));
        console.log("d_name"+ (this.d_name));
        console.log("d_isdimmer:"+ (this.d_isdimmer));
        console.log("d_min:"+ (this.d_min));
        console.log("d_max:"+ (this.d_max));
    }

  ngOnInit() {}
// check(){
//   console.log("check" + this.players)
// }

dismiss() {
  this.viewCtrl.dismiss();
  // this.players.splice(0, this.players.length)
}
dType;
checkChecked(e) {
  this.dType = e.currentTarget.value;
  console.log('type' + this.dType)
}
submitdevice(){
  console.log("type:" + this.dType);
  let name = (<HTMLInputElement>document.getElementById('deviceName')).value;
  console.log("name:" + name);
  if(this.dType=="" || name==""){
   console.log("you have fill both device-name and device-type");
   this.user.showToast("you have to fill both device-name and device-type");
  }
  else{
    this.user.present("please wait...");
    this.auth.setDeviceName(this.d_id,this.dType,name).subscribe(res=>{
      console.log("update device:" + JSON.stringify(res));     
      if(this.d_isdimmer=='false'){     
        this.dismiss();     
        this.user.showDevice=false; 
        this.user.showRoom = true; 
        this.navCtrl.navigateRoot('/mainpage');     
        this.user.dismiss();
      }
       else{   
      if(this.d_isdimmer=='true' ){
        let min = (<HTMLInputElement>document.getElementById('min')).value;
        let max = (<HTMLInputElement>document.getElementById('max')).value;
        console.log("min:" + min);
        console.log("max:" + max);
        if(min=="" || max==""){
          this.user.showToast("you have to fill both min & max");
        }
        else{
          this.auth.setMinMax(this.dimmer_id, min, max).subscribe(res => {
            console.log("minmax:" + res);          
            this.dismiss(); 
            this.user.showDevice=false;  
            this.user.showRoom = true;      
            this.navCtrl.navigateRoot('/mainpage');         
            this.user.dismiss();
          },err=>{
            console.log("minmax_error:"+ "min max error.");
            this.dismiss();
            this.user.dismiss();
            this.user.showToast("something went wrong. please contact support team");
            this.navCtrl.navigateRoot('/mainpage');            
          })
        }       
      }
    }
      },err=>{
        this.user.dismiss();
        this.dismiss();
        this.navCtrl.navigateRoot('/mainpage');
        this.user.showToast("something went wrong. please contact support team");
        console.log("please select device type.");
      })
  }
  
}




}
