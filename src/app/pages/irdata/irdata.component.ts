import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ModalController } from '@ionic/angular';
import { IrnumberComponent } from '../irnumber/irnumber.component';
import { IrextraComponent } from '../irextra/irextra.component';

@Component({
  selector: 'app-irdata',
  templateUrl: './irdata.component.html',
  styleUrls: ['./irdata.component.scss'],
})
export class IrdataComponent implements OnInit {
  company_name;
  product_name;
  butt
ir_number;
remote_id;
// tvshow=false;
// acshow=false;
  constructor(private user: UserService,
    private auth: AuthService,
    private navCtrl: NavController,
    private modalController: ModalController) { 
      console.log(this.user.productName);
      console.log(this.user.companyName);
      let body = {
        "company_name": this.user.companyName,
        'product_name': this.user.productName
      }
     this.user.present('please wait...');
      this.auth.postIrcompanyproduct(body).subscribe(res=>{
        console.log(res);
        this.remote_id=res;
        
        this.user.dismiss();
        console.log(this.remote_id.id);
      },err=>{
        this.user.dismiss();
      })
    }

  ngOnInit() {}


  tvpowerClick(){
    let powerbody={
        "remote_id": this.remote_id.id,
       "button_name": "power_on_button_one"
    }
    this.user.present('loading data...');
    this.auth.postIrbuttondata(powerbody).subscribe(res=>{
      console.log(res);
      $(".tvpower").css("color", "green");
      this.user.dismiss();
    },err=>{
      this.user.dismiss();
      console.log(err.error);
    })  
  }
  powerClick(){
    let powerbody={
      "remote_id": this.remote_id.id,
     "button_name": "power_on_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".power").css("color", "green");
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error);
  }) 
  }

  menuClick(){
    let powerbody={
      "remote_id": this.remote_id.id,
     "button_name": "menu_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".menu").css("color", "green");
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error);
  }) 
  }

  voiceplus(){
    let powerbody={
      "remote_id": this.remote_id.id,
     "button_name": "volume_up_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".voiceplus").css("color", "green");
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }

  voiceminus(){
    let powerbody={
      "remote_id": this.remote_id.id,
     "button_name": "volume_down_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".voiceminus").css("color", "green");
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }

  channelplus(){
    let powerbody={
      "remote_id": this.remote_id.id,
     "button_name": "channel_up_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".channelplus").css("color", "green");
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }
  channelminus(){
    let powerbody={
      "remote_id": this.remote_id.id,
     "button_name": "channel_down_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".channelminus").css("color", "green");
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }

  caretup(){
    let powerbody={
      "remote_id": this.remote_id.id,
     "button_name": "up_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".caretup").css("color", "green");
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }

  caretdown(){
    let powerbody={
      "remote_id": this.remote_id.id,
     "button_name": "down_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".caretdown").css("color", "green");
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }

  caretback(){
    let powerbody={
      "remote_id": this.remote_id.id,
     "button_name": "left_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".caretback").css("color", "green");
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }

  caretforward(){
    let powerbody={
      "remote_id": this.remote_id.id,
     "button_name": "right_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".caretforward").css("color", "green");
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }


 async irunmber(){
    const modal = await this.modalController.create({
      component: IrnumberComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: { remoteid:  this.remote_id.id,
                  
                      }
    });
    return await modal.present();
  }

  async irextra(){
    const modal = await this.modalController.create({
      component: IrextraComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: { remote_id:  this.remote_id.id,
                      }
    });
    return await modal.present();
  }

}
