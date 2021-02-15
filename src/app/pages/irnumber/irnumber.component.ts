import { Component, OnInit, Input } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-irnumber',
  templateUrl: './irnumber.component.html',
  styleUrls: ['./irnumber.component.scss'],
})
export class IrnumberComponent implements OnInit {
  @Input() remoteid;
  constructor(public viewCtrl: ModalController,
              private auth: AuthService,
              private user:UserService) { }

  ngOnInit() {}


  click1(){
    console.log(this.remoteid);
    let powerbody={
      "remote_id": this.remoteid,
     "button_name": "one_button_one"
  }
  this.user.present('loadding data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".click1").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }

  click2()
  {
    console.log(this.remoteid);
    let powerbody={
      "remote_id": this.remoteid,
     "button_name": "two_button_one"
  }
  this.user.present('loadding data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".click2").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }

  click3(){
    console.log(this.remoteid);
    let powerbody={
      "remote_id": this.remoteid,
     "button_name": "three_button_one"
  }
  this.user.present('loadding data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".click3").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }

  click4(){
    console.log(this.remoteid);
    let powerbody={
      "remote_id": this.remoteid,
     "button_name": "four_button_one"
  }
  this.user.present('loadding data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".click4").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }

  click5(){
    console.log(this.remoteid);
    let powerbody={
      "remote_id": this.remoteid,
     "button_name": "four_button_one"
  }
  this.user.present('loadding data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".click5").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  })  
  }

  click6(){
    console.log(this.remoteid);
    let powerbody={
      "remote_id": this.remoteid,
     "button_name": "six_button_one"
  }
  this.user.present('loadding data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".click6").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }

  click7(){
    console.log(this.remoteid);
    let powerbody={
      "remote_id": this.remoteid,
     "button_name": "seven_button_one"
  }
  this.user.present('loadding data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".click7").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }

  click8(){
    console.log(this.remoteid);
    let powerbody={
      "remote_id": this.remoteid,
     "button_name": "eight_button_one"
  }
  this.user.present('loadding data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".click8").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }

  click9(){
    console.log(this.remoteid);
    let powerbody={
      "remote_id": this.remoteid,
     "button_name": "nine_button_one"
  }
  this.user.present('loadding data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".click9").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }

  clickzero(){
    console.log(this.remoteid);
    let powerbody={
      "remote_id": this.remoteid,
     "button_name": "zero_button_one"
  }
  this.user.present('loadding data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".click0").css("color", "green")
    $(".click0").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error)
  }) 
  }
  clickstar(){
    console.log('* click ...');
  }
  clickhash(){
    console.log('hash click...');
  }

  dismiss() {
    this.viewCtrl.dismiss();
    }

}
