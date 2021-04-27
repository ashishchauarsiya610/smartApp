import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
declare var CameraCustom;

@Component({
  selector: 'app-tuya-message',
  templateUrl: './tuya-message.component.html',
  styleUrls: ['./tuya-message.component.scss'],
})
export class TuyaMessageComponent implements OnInit {
  messages: any;
  show=false;
  constructor(private modalctrl:ModalController,public user:UserService,) { }

  ngOnInit() {
    let body = {}
    CameraCustom.getmessage("message",
      async res=>{
        this.user.messages=res;
      if(this.user.messages.length != 0){
        this.show=true;
      }
        console.log(this.user.messages[0].name)
        //this.navCtrl.navigateRoot('/tMsg'); 
     },
      err=>{
       alert(JSON.stringify(err))
      }) 
    this.messages=this.user.messages;
  }
  showMessageDetails(){
    let body = { 'id': this.user.tuyaDevices[0].id }
    CameraCustom.messagePanel(body,
      res => {
        this.user.showToast(JSON.stringify(res));
        //alert(JSON.stringify(res)) 
        this.shareMsg(res);
      },
      err => {
        alert(JSON.stringify(err))
      })
  }
  shareMsg(msg) {
    const options = {
      message: msg,
      url: null
    }
    // this.socialShare.shareWithOptions(options);
  }
}
