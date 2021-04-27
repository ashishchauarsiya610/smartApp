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
ir_device_id;
ir_product_id;
// tvshow=false;
// acshow=false;
  constructor(private user: UserService,
    private auth: AuthService,
    private navCtrl: NavController,
    private modalController: ModalController) { 
      console.log("product name:"+ this.user.productName);
      console.log("company id:"+this.user.companyName);
      console.log("company name"+this.user.remote_company_id)
      console.log("ir_device_id:"+ this.user.ir_device_id);
      console.log('ir_product_id'+ this.user.ir_product_id)
    this.ir_device_id=this.user.ir_device_id;
    this.ir_product_id=this.user.ir_product_id;
      let body = {
        "company_name": this.user.remote_company_id,
        "product_id": this.ir_product_id,
        "device_id": this.ir_device_id
      }
     this.user.present('please wait...');
      this.auth.irStart(body).subscribe(res=>{
        console.log(res);
        this.remote_id=res;
        
        this.user.dismiss();
        console.log(this.remote_id.id);
        alert("ir data start...");
        alert(res);
        alert("res:"+this.remote_id);
      },err=>{
        this.user.dismiss();
        alert(err);
        alert("err"+JSON.stringify(err.error));
      })
    }

  ngOnInit() {}


  tvpowerClick(){
    let powerbody={
        
       "button_name": "power_on",
       "device_id": this.ir_device_id,
       "remote_id": this.remote_id,
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
      "button_name": "power_on",
      "device_id": this.ir_device_id,
      "remote_id": this.remote_id,
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
      "button_name": "mute_on",
      "device_id": this.ir_device_id,
      "remote_id": this.remote_id,
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
       "button_name": "volume_up_button_one",
       "device_id": this.ir_device_id,
       "remote_id": this.remote_id,
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
     "button_name": "volume_down_button_one",
     "device_id": this.ir_device_id,
     "remote_id": this.remote_id,
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
     "button_name": "channel_up_button_one",
     "device_id": this.ir_device_id,
     "remote_id": this.remote_id,
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
     "button_name": "channel_down_button_one",
     "device_id": this.ir_device_id,
     "remote_id": this.remote_id,
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
     "button_name": "up_button_one",
     "device_id": this.ir_device_id,
     "remote_id": this.remote_id,
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
     "button_name": "down_button_one",
     "device_id": this.ir_device_id,
     "remote_id": this.remote_id,
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
     "button_name": "left_button_one",
     "device_id": this.ir_device_id,
     "remote_id": this.remote_id,
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
     "button_name": "right_button_one",
     "device_id": this.ir_device_id,
     "remote_id": this.remote_id,
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

  startIRLearning(){
    alert("company_name:"+ this.user.companyName)
    alert("prod:"+ this.ir_product_id);
    alert("devi:"+ this.ir_device_id);
    console.log('start learning...')
    let powerbody=JSON.stringify({
      "company_name": this.user.remote_company_id,
      "product_id": this.ir_product_id,
      "device_id": this.ir_device_id
  })
  this.user.present('loading data...');
  this.auth.irStart(powerbody).subscribe(res=>{
    console.log(res);
    this.user.showToast('ir data collection start...');
    alert(res);
    alert("start ir"+ JSON.stringify(res))
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    this.user.showToast("error called...");
    alert(err);
    console.log(err.error)
  }) 
  }

}
