import { Component, OnInit } from '@angular/core';
import {NgxQrcodeElementTypes,NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
declare var CameraCustom;
@Component({
  selector: 'app-qrcode-tuya',
  templateUrl: './qrcode-tuya.component.html',
  styleUrls: ['./qrcode-tuya.component.scss'],
})
export class QrcodeTuyaComponent implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {}
  createdCode:String=null;
  elementType=NgxQrcodeElementTypes.URL;
  correctionLevel=NgxQrcodeErrorCorrectionLevels.HIGH;
  getwifidetail(){
    let ssid = prompt("WIFI NAME:", "");
          if (ssid == null || ssid == "") {
            alert("Please Enter WIFI Name")
          } else {
            // let pass = prompt("WIFI PASSWORD:", "");
            // if (pass == null || pass == "") {
            //   alert("Please Enter WIFI Password")
            // } else {
              this.QR( ssid )
              //}
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
}
