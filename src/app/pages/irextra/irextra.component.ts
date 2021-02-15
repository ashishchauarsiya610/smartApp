import { Component, OnInit, Input } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-irextra',
  templateUrl: './irextra.component.html',
  styleUrls: ['./irextra.component.scss'],
})
export class IrextraComponent implements OnInit {
@Input() remote_id;
  constructor(public viewCtrl: ModalController,
               private auth: AuthService,
               private user:UserService) { 
    console.log(this.remote_id)
  }

  ngOnInit() {}
  
  exitclick(){
    console.log(this.remote_id);
    let powerbody={
      "remote_id": this.remote_id,
     "button_name": "exit_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".exit").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error);
  }) 
  }

  playclick(){
    console.log(this.remote_id);
    let powerbody={
      "remote_id": this.remote_id,
     "button_name": "play_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".play").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error);
  }) 
  }

  recordclick(){
    console.log(this.remote_id);
    let powerbody={
      "remote_id": this.remote_id,
     "button_name": "record_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".record").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error);
  }) 
  }

 pauseclick(){
    console.log(this.remote_id);
    let powerbody={
      "remote_id": this.remote_id,
     "button_name": "pause_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".pause").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error);
  }) 
  }

  nextclick(){
    console.log(this.remote_id);
    let powerbody={
      "remote_id": this.remote_id,
     "button_name": "next_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".pause").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error);
  }) 
  }

  previosclick(){
    console.log(this.remote_id);
    let powerbody={
      "remote_id": this.remote_id,
     "button_name": "previous_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".previous").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error);
  }) 
  }

  muteclick(){
    console.log(this.remote_id);
    let powerbody={
      "remote_id": this.remote_id,
     "button_name": "mute_button_one"
  }
  this.user.present('loading data...');
  this.auth.postIrbuttondata(powerbody).subscribe(res=>{
    console.log(res);
    $(".mute").css("--background-color", "green");
    $(".mute").css("color", "green")
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error);
  }) 
  }

  dismiss() {
    this.viewCtrl.dismiss();
    }

}
