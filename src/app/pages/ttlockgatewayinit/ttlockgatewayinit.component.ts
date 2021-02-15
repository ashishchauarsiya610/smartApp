import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
declare var TTlockdata;
@Component({
  selector: 'app-ttlockgatewayinit',
  templateUrl: './ttlockgatewayinit.component.html',
  styleUrls: ['./ttlockgatewayinit.component.scss'],
})
export class TtlockgatewayinitComponent implements OnInit {

  constructor(private user: UserService,
    private authService: AuthService,
    private navCtrl: NavController,
    private androidPermissions:AndroidPermissions) { }

  ngOnInit() {}

  scanLock(){
    console.log("init call");
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION, this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION])
    .then(result =>{
      TTlockdata.scanGateway("scan",
      res=>{
        alert("res:"+res);
        console.log("gateway scan:"+res);
      // this.connectlock();
      },err=>{
        alert("error"+err)
      }) 
    })
    
  //  TTlockdata.lockscan('scan',
  //  res=>{
  //    alert(res);
  //  },err=>{

  //  })
  }
  connectlock(){ 
      TTlockdata.connectGateway("connect",
      res=>{
        alert("res:"+res.ExtendedBluetoothDevice);
        console.log("connect res:"+res.ExtendedBluetoothDevice);
      },err=>{
        alert("connect error"+err)
      })  
  }

  scanwifi(){
    TTlockdata.scanWifi("wifilist",
    res=>{
      alert("res:"+res);
      console.log("wifi res:"+res);
    },err=>{
      alert("wifi error"+err)
    }) 
  }

}
