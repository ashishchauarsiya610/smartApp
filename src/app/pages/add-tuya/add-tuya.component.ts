
import { Component, OnInit } from '@angular/core';
//import { NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
declare var CameraCustom;
//import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import {NgxQrcodeElementTypes,NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-add-tuya',
  templateUrl: './add-tuya.component.html',
  styleUrls: ['./add-tuya.component.scss'],
})
export class AddTuyaComponent implements OnInit {
  createdCode:String=null;
  elementType=NgxQrcodeElementTypes.URL;
  correctionLevel=NgxQrcodeErrorCorrectionLevels.HIGH;
  //width:number=0.5;

  constructor(public navCtrl:NavController) { }

  ngOnInit() {}
  getwifidetail(){
    let ssid = prompt("WIFI NAME:", "");
          if (ssid == null || ssid == "") {
            alert("Please Enter WIFI Name")
          } else {
            //let pass = prompt("WIFI PASSWORD:", "");
            // if (pass == null || pass == "") {
            //   alert("Please Enter WIFI Password")
            // } else {
              this.QR( ssid );
             // }
          }
  }

  QR(ssid){
    let body = { ssid: ssid}
    CameraCustom.qrGen(body,
     res=>{
         this.createdCode=res;
       //alert(this.createdCode) 
    },
     err=>{
      alert(JSON.stringify(err))
      alert("4 error")
     })
   }
   navigateToHome(ev){
     //alert(ev.target.checked)
    this.navCtrl.navigateRoot('/mainpage');
   }
   navigateNext(ev){
    this.navCtrl.navigateRoot('/tuyaQr'); 
   }
}
